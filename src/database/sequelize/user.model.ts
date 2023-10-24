import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../config/dbConfig';
export class UserModel extends Model {
  public id!: number;
  public name!: string;
  public email!: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
  public password!: string;
  public phone!: string;
  public birthday!: Date;
  public address!: string;
  public city!: string;
  public countryCode!: string;
}

// /**
//  * Initialize the LoginModel.
//  * @param {Sequelize} sequelize - The Sequelize instance.
//  */

UserModel.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      comment: 'Auto increment primary key',
    },
    firstname: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastname: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      validate: {
        isEmail: true,
      },
      allowNull: false,
      unique: true,
    },
    phone: {
      type: DataTypes.STRING,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    birthday: {
      type: DataTypes.DATEONLY,
    },
    address: {
      type: DataTypes.TEXT,
    },
    city: {
      type: DataTypes.STRING,
    },
    countryCode: {
      type: DataTypes.STRING,
    },
    token: {
      type: DataTypes.STRING,
      defaultValue: null,
    },
    refreshToken: {
      type: DataTypes.STRING,
      defaultValue: null,
    },
  },
  {
    sequelize,
    modelName: 'User',
  }
);

UserModel.sync();
