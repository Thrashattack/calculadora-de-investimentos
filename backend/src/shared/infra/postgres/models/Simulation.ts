import {
  DataTypes,
  HasOneCreateAssociationMixin,
  HasOneGetAssociationMixin,
  HasOneSetAssociationMixin,
  Model,
  ModelCtor,
  Sequelize,
} from 'sequelize';
import { SequelizeAttributes } from '@common-types/SequelizeAttributes';
import { UserAttributes, UserInstance } from './User';

export interface SimulationAttributes {
  [key: string]: unknown;
  id?: number;
  userId?: number;
  months: number;
  initialAmount: number;
  cdbRentability: number;
  savingsRentability: number;
  cdiOverCdb: number;
  cdbFinalAmount: number;
  savingsFinalAmount: number;
  simulationDate: string;
  user?: UserAttributes;
}

export interface SimulationInstance
  extends Model<SimulationAttributes>,
    SimulationAttributes {
  getUser: HasOneGetAssociationMixin<UserInstance>;
  setUser: HasOneSetAssociationMixin<UserInstance, UserInstance['id']>;
  createUser: HasOneCreateAssociationMixin<UserInstance>;
}

export const SimulationFactory = (
  sequelize: Sequelize,
): ModelCtor<SimulationInstance> => {
  const attributes: SequelizeAttributes<SimulationAttributes> = {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      references: 'user',
      key: 'id',
    },
    months: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    initialAmount: {
      type: DataTypes.DECIMAL,
      allowNull: false,
    },
    cdbRentability: {
      type: DataTypes.DECIMAL,
      allowNull: false,
    },
    savingsRentability: {
      type: DataTypes.DECIMAL,
      allowNull: false,
    },
    cdiOverCdb: {
      type: DataTypes.DECIMAL,
      allowNull: false,
    },
    cdbFinalAmount: {
      type: DataTypes.DECIMAL,
      allowNull: false,
    },
    savingsFinalAmount: {
      type: DataTypes.DECIMAL,
      allowNull: false,
    },
    simulationDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  };

  const Simulation = sequelize.define<SimulationInstance, SimulationAttributes>(
    'Simulation',
    attributes,
  );

  return Simulation;
};
