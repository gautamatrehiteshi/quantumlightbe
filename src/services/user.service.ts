import { Op } from 'sequelize';
import { UserModel } from '../database/sequelize/user.model';

export const findOneByEmail = async (
  email: string
): Promise<UserModel | null> => {
  return await UserModel.findOne({ where: { email: email } });
};
export const findUserByEmailOrPhone = async (
  email: string,
  contactNumber: string
): Promise<UserModel | null> => {
  return await UserModel.findOne({
    where: {
      [Op.or]: [{ email: email }, { contactNumber: contactNumber }],
    },
  });
};
export const findUserbyPhone = async (
  phone: string
): Promise<UserModel | null> => {
  return await UserModel.findOne({ where: { phone } });
};

export const createOneUser = async (user: {
  email: string;
  password: string;
  firstname: string;
  lastname: string;
}): Promise<UserModel> => {
  return await UserModel.create(user);
};

export const findUserByIdExcludePassword = async (
  id: number
): Promise<UserModel | null> => {
  return await UserModel.findByPk(id, {
    attributes: { exclude: ['password'] },
  });
};
