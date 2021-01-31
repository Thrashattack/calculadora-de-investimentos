import { Sequelize } from 'sequelize';
import { DbInterface } from '@common-types/DbInterface';
import { UserFactory } from './User';
import { SimulationFactory } from './Simulation';

import dbConfig from '@config/db';

export const createModels = (): DbInterface => {
  const { database, user, password, params } = dbConfig;
  const sequelize = new Sequelize(database, user, password, params);

  const Simulation = SimulationFactory(sequelize);
  const User = UserFactory(sequelize);

  Simulation.hasOne(User, { foreignKey: 'id', as: 'user' });
  User.hasMany(Simulation, { foreignKey: 'userId', as: 'simulations' });

  const db: DbInterface = {
    sequelize,
    Sequelize,
    Simulation,
    User,
  };

  return db;
};
