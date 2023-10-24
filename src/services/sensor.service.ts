// import { Op } from 'sequelize';
import { SensorModel } from '../database/sequelize/sensor.model';
import { Sensor } from '../validators/sensor';
import { sequelize } from '../database/config/dbConfig';
export const findSensorByGroupName = async (
  group: string
): Promise<SensorModel[]> => {
  return await SensorModel.findAll({ where: { group } });
};
export const findAllSensor = async (): Promise<SensorModel[]> => {
  return await SensorModel.findAll();
};
export const createSensor = async (sensor: Sensor): Promise<SensorModel> => {
  return await SensorModel.create(sensor);
};
export const findDistinctGroupName = async (): Promise<Sensor[]> => {
  return await SensorModel.findAll({
    attributes: [[sequelize.fn('DISTINCT', sequelize.col('group')), 'group']],
  });
};
// export const createMany = async (sensor: Sensor[]): Promise<SensorModel[]> => {
//   console.log(sensor);
//   return await SensorModel.bulkCreate(sensor);
// };
