import { Handler, Request, Response } from 'express';

interface AsyncHandler {
  (req: Request, res: Response): Promise<Response>;
}

/**
 *
 * @param handler
 */
export default function asyncFunction(handler: AsyncHandler): Handler {
  return async (req, res, next) => {
    try {
      await handler(req, res);
    } catch (e) {
      next(e);
    }
  };
}
