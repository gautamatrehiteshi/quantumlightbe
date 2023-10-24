import { Request, Response, NextFunction } from 'express';

/**
 *
 * @param err
 * @param req
 * @param res
 * @param _next
 */
export default function errorHandler(
  err: Error,
  req: Request,
  res: Response,
  _next: NextFunction
): Response {
  console.log(err);
  return res
    .status(500)
    .send({ status: 500, error: 'server error', msg: err.message });
}
