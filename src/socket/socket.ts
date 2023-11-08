import { Server, Socket } from 'socket.io';
import { UserModel } from '../database/sequelize/user.model';
import jose from 'node-jose';
import * as mqtt from 'mqtt';
import { topicData } from './mqttTopics';

// import { findAllSensor } from '../services/sensor.service';

interface ISocket extends Socket {
  user?: UserModel;
  token?: string;
}
// using obj to store user sessions so that user cannot accidentally create multiple socket and mtt conections
// saving sessions in app for now might use services like redis in future
const obj: { [id: string]: boolean } = {};

/**
 *
 * @param io
 */
export async function socket(io: Server): Promise<void> {
  // const topicData = await findAllSensor();
  //using socket middleware to authenticate user by login token
  io.use(async (socket: ISocket, next): Promise<void> => {
    const token = socket.handshake.auth.token as string;

    if (obj[token]) {
      return next(new Error('socket connection already exist'));
    }
    if (!process.env.JWT_KEY) throw new Error('JWT_KEY not defined');
    try {
      if (!token) return next(new Error('token not provided'));
      const publicKey = JSON.parse(process.env.JWT_KEY);

      const key = await jose.JWK.asKey(publicKey);

      const verified = await jose.JWS.createVerify(key).verify(token);
      const payload = JSON.parse(verified.payload.toString());
      const user = await UserModel.findOne({
        attributes: { exclude: ['password'] },
        where: { id: payload.sub },
      });
      if (!user) return next(new Error('user not found'));

      //adding user in socket instance of that user
      socket.user = user;
    } catch (e) {
      if (e instanceof Error) {
        console.log(e.message);
        e.message = 'invalid auth token';
        return next(e);
      }
    }

    //storing user token in socket instance to use it in maintaining user sessions
    socket.token = token;
    next();
  });

  //listining on user connection event
  io.on('connection', (socket: ISocket) => {
    console.log('a user connected', socket.id);

    if (socket.token) {
      obj[socket.token] = true;
    }

    console.log(obj);

    const client = mqtt.connect({
      host: process.env.MQTT_HOST,
      port: parseInt(process.env.MQTT_PORT as string),
      protocol: 'mqtt',
    });
    // let dataObj: unknown;
    // socket.on('start', () => {
    //   console.log('publishing dummy data');
    //   const data = setInterval(() => {}, 5000);
    //   dataObj = data;
    // });
    // socket.on('stop', () => {
    //   console.log('stop publishing dummy data');
    //   console.log(dataObj);
    //   clearInterval();
    // });

    let dataObj: NodeJS.Timer | null = null;

    socket.on('start', () => {
      console.log('publishing dummy data');
      const data = setInterval(() => {
        for (let i = 0; i < topicData.length; i++) {
          const value = topicData[i]['Value'].split(' ');
          const int = parseInt(value[0]);
          if (int || int == 0) {
            value[0] = Math.floor(Math.random() * 100).toString();
          }

          client.publish('guardian/' + topicData[i].Sensor, value.join(' '));
        }
      }, 2500);
      dataObj = data;
    });

    socket.on('stop', () => {
      console.log('stop publishing dummy data');
      if (dataObj) {
        console.log(dataObj);
        clearInterval(dataObj);
        dataObj = null;
      } else {
        console.log('No active interval to clear');
      }
    });

    //listen on mqtt connection
    client.on('connect', () => {
      // subscribe all car topics
      console.log('mqtt connected');
      for (const topic of topicData) {
        client.subscribe('guardian/' + topic.Sensor, (err) => {
          if (err) {
            console.log(err);
            socket.emit('error', { type: 'topic subscription', msg: err });
          }
        });
      }
    });

    client.on('message', (topic, message) => {
      // message is Buffer
      //emiting data for every topic on diffrent socket events with same name as mqtt topics
      topic = topic.split('/')[1];
      const data = message.toString().split(' ');
      const int = parseInt(data[0]);
      if (int || int == 0) {
        socket.emit(topic, { topic, value: data[0], unit: data[1] });
      } else {
        socket.emit(topic, { topic, value: data.join(' '), unit: null });
      }
    });

    socket.on('disconnect', () => {
      console.log('disconected');
      client.end();
      if (socket.token) {
        delete obj[socket.token];
      }
    });
  });
}
