import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../config/dbConfig';
export class SensorModel extends Model {
  public id!: number;
  public name!: string;
  public group!: string;
  public pid!: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

SensorModel.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      comment: 'Auto increment primary key',
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    group: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    pid: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
  },
  {
    sequelize,
    modelName: 'Sensor',
  }
);

SensorModel.sync();
