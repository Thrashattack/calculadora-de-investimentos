import { UserInstance } from '@shared/infra/postgres/models/User';
import Repository from '@shared/infra/postgres/Repository';
import { ModelCtor, Transaction } from 'sequelize';

export default class UserRepository extends Repository {
  private UserRepository: ModelCtor<UserInstance>;
  constructor() {
    super();
    this.UserRepository = this.db.User;
  }

  async findById(id: number): Promise<UserInstance> {
    const transaction = new Transaction(this.db.sequelize, { autocommit: true })
    const user = await this.UserRepository.findOne({ where: { id }, transaction });
    if (!user) {
      await transaction.rollback();
      return Promise.reject(user);
    }
    return Promise.resolve(user);
  }

  async findByLogin(login: string): Promise<UserInstance> {
    const transaction = new Transaction(this.db.sequelize, { autocommit: true })
    const user = await this.UserRepository.findOne({ where: { email: login }, transaction });
    if (!user) {
      await transaction.rollback();
      return Promise.reject(user);
    }
    
    return Promise.resolve(user);
  }

  async save(user: UserInstance): Promise<UserInstance> {
    const transaction = new Transaction(this.db.sequelize, { autocommit: true })
    const createUser = await this.UserRepository.create(user, { transaction });
    if (!createUser) {
      await transaction.rollback();
      return Promise.reject(createUser);
    }
    return Promise.resolve(createUser);
  }
}
