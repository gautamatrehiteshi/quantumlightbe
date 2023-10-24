import { Request as ExpressRequest, Response, NextFunction } from 'express';
import { v4 as uuidv4 } from 'uuid';
import morgan from 'morgan';

// Create a new Request type that includes the id property
interface Request extends ExpressRequest {
  id?: string;
}

morgan.token('id', function getId(req: Request) {
  return req.id;
});

const loggerFormat =
  ':remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length] ":referrer" ":user-agent" :id';

export const transactionIdMiddleware = (
  req: Request,
  _res: Response,
  next: NextFunction
): void => {
  req.id = uuidv4();
  next();
};

const skipSuccess = (_req: Request, res: Response): boolean =>
  res.statusCode < 400;
const skipFailure = (_req: Request, res: Response): boolean =>
  res.statusCode >= 400;

export const logger = morgan(loggerFormat, {
  skip: skipSuccess,
  stream: process.stderr,
});

export const loggerSuccess = morgan(loggerFormat, {
  skip: skipFailure,
  stream: process.stdout,
});
