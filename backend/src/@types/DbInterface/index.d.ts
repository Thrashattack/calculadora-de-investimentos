import * as Sequelize from 'sequelize';
import { SimulationInstance } from '@shared/infra/postgres/models/Simulation';
import { UserInstance } from '@shared/infra/postgres/models/User';

export interface DbInterface {
  sequelize: Sequelize.Sequelize;
  Sequelize: Sequelize.SequelizeStatic;
  Simulation: Sequelize.ModelCtor<SimulationInstance>;
  User: Sequelize.ModelCtor<UserInstance>;
}
