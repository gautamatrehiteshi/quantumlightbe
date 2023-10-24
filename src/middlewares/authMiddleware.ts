import { UserModel } from '../database/sequelize/user.model';
import { Request, Response, NextFunction } from 'express';
import jose from 'node-jose';

export interface IRequest extends Request {
  user?: UserModel;
}

/**
 *
 * @param req
 * @param res
 * @param next
 */
export async function auth(
  req: IRequest,
  res: Response,
  next: NextFunction
): Promise<void | Response<any, Record<string, any>>> {
  const token = req.header('Authorization');

  if (!token)
    return res.status(400).send({ status: 400, msg: 'token not provided' });
  try {
    if (!process.env.JWT_KEY) throw new Error('JWT_KEY not defined');
    const publicKey = JSON.parse(process.env.JWT_KEY);

    const key = await jose.JWK.asKey(publicKey);

    const verified = await jose.JWS.createVerify(key).verify(token);
    const payload = JSON.parse(verified.payload.toString());
    const user = await UserModel.findOne({
      where: { id: payload.sub },
    });
    if (!user)
      return res.status(404).send({ status: 0, msg: 'user not found' });

    req.user = user;

    next();
  } catch (e) {
    if (e instanceof Error) console.log(e.message);
    return res.status(401).send({ status: 0, msg: 'invalid token' });
  }
}
