import {
  DataTypes,
  HasManyCreateAssociationMixin,
  HasManyGetAssociationsMixin,
  HasManySetAssociationsMixin,
  Model,
  Sequelize,
  ModelCtor,
} from 'sequelize';
import { SequelizeAttributes } from '@common-types/SequelizeAttributes';
import { SimulationAttributes, SimulationInstance } from './Simulation';

export interface Authentication {
  token: string;
  expires: Date;
}

export interface UserAttributes {
  [key: string]: unknown;
  id?: number;
  name: string;
  email: string;
  phone: string;
  login: string;
  password: string;
  createdAt?: Date;
  updatedAt?: Date;
  simulations?: SimulationAttributes[];
}

export interface UserInstance extends Model<UserAttributes>, UserAttributes {
  getSimulations: HasManyGetAssociationsMixin<SimulationInstance[]>;
  setSimulations: HasManySetAssociationsMixin<
    SimulationInstance[],
    SimulationInstance['id']
  >;
  createSimulations: HasManyCreateAssociationMixin<SimulationInstance[]>;
}

export const UserFactory = (sequelize: Sequelize): ModelCtor<UserInstance> => {
  const attributes: SequelizeAttributes<UserAttributes> = {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    login: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  };

  const User = sequelize.define<UserInstance, UserAttributes>(
    'User',
    attributes,
  );

  return User;
};
