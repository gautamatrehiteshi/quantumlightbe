import { Request, Response } from 'express';
import * as bcrypt from 'bcrypt';
import {
  validateCreateUser,
  validateUpdateUser,
  validateChangePassword,
} from '../../validators/user/index';
import asyncFunction from '../../middlewares/asyncMiddleware';
import { IRequest } from '../../middlewares/authMiddleware';
import {
  findOneByEmail,
  createOneUser,
  findUserByIdExcludePassword,
} from '../../services/user.service';
// import { UserModel } from '../../database/sequelize/User.model';
export const createUser = asyncFunction(
  async (req: Request, res: Response): Promise<Response> => {
    const { data, error } = validateCreateUser(req.body);
    if (error)
      return res
        .status(400)
        .send({ status: 400, msg: error.formErrors.fieldErrors });

    if (!data)
      return res
        .status(400)
        .send({ status: 400, msg: 'body can not be empty' });
    let user = await findOneByEmail(data.email);

    if (user) {
      return res.status(400).send({ status: 400, msg: 'User already exists' });
    }

    data.password = await bcrypt.hash(data.password, 10);

    user = await createOneUser(data);

    return res.status(201).send({ status: 201, msg: 'success' });
  }
);

export const getCurrentUser = asyncFunction(
  async (req: IRequest, res: Response): Promise<Response> => {
    if (!req.user)
      return res.status(400).send({ status: 400, msg: 'User not found' });
    const user = await findUserByIdExcludePassword(req.user.id);
    return res.send({ status: 200, data: user, msg: 'success' });
  }
);

export const updateUser = asyncFunction(
  async (req: IRequest, res: Response): Promise<Response> => {
    let user = req.user;
    if (!user)
      return res.status(400).send({ status: 400, msg: 'User not found' });

    const { data, error } = validateUpdateUser(req.body);
    if (error)
      return res
        .status(400)
        .send({ status: 400, msg: error.formErrors.fieldErrors });

    if (!data)
      return res
        .status(400)
        .send({ status: 400, msg: 'body can not be empty' });

    user = await user.update(data);
    const result = await findUserByIdExcludePassword(user.id);

    return res.status(200).send({ status: 200, msg: 'success', data: result });
  }
);
export const changePassword = asyncFunction(
  async (req: IRequest, res: Response): Promise<Response> => {
    const user = req.user;
    if (!user)
      return res.status(400).send({ status: 400, msg: 'User not found' });

    const { data, error } = validateChangePassword(req.body);
    if (error)
      return res
        .status(400)
        .send({ status: 400, msg: error.formErrors.fieldErrors });

    if (!data)
      return res
        .status(400)
        .send({ status: 400, msg: 'body can not be empty' });

    if (data.newPassword == data.oldPassword)
      return res
        .status(400)
        .send({ status: 400, msg: 'new and old password cannot be same' });

    const pwMatched = await bcrypt.compare(data.oldPassword, user.password);

    if (!pwMatched)
      return res.status(400).send({ status: 400, msg: 'invalid password' });

    user.password = await bcrypt.hash(data.newPassword, 10);

    await user.save();
    return res.send({ status: 200, msg: 'success' });
  }
);
