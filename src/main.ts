import dotenv from 'dotenv';
// dotenv config
dotenv.config();

import cors from 'cors';
import express, { Request, Response, NextFunction } from 'express';
import helmet from 'helmet';
import { checkSecretKey } from './utils/checkSecretKey';
import {
  transactionIdMiddleware,
  logger,
  loggerSuccess,
} from './middlewares/transactionId';
import { Server } from 'socket.io';
import { socket } from './socket/socket';
// Modules

// Constants
import { COMMIT_ID } from './commit-id';
import routes from './routes';
import errorHandler from './middlewares/errorMiddleware';
import { createServer } from 'node:http';
// import path from 'path';

//checking for secretKey
checkSecretKey().then();
const app = express();
const server = createServer(app);
const io = new Server(server, { cors: { origin: '*' } });
const port = process.env.APP_PORT || 8080;
app.use(cors({ origin: '*' }));

// Use middlewares
app.use(transactionIdMiddleware);
app.use(logger);
app.use(loggerSuccess);
//commented file are used for test deployment
// app.use(express.static('./public'));

app.use((req: Request, res: Response, next: NextFunction): void => {
  res.setHeader('X-commit-ID', COMMIT_ID);
  next();
});

app.use(express.json());
app.use(helmet());

//Setup socket and mqtt conections
socket(io);
// Setup apis
app.use('/api', routes);
// app.get('*', (req, res) => {
//   res.sendFile(path.resolve(__dirname, 'public', 'index.html'));
// });

// Hadling error in route handler
app.use(errorHandler);

// Start server
server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
