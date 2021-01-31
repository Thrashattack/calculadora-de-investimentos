import UserRepository from '@modules/auth/infra/postgres/repositories/UserRepository';
import { UserInstance } from '@shared/infra/postgres/models/User';

import IService from '@shared/core/IService';

export default class VerifyUserExistentService
  implements IService<string, Promise<boolean>> {
  private UserRepository: UserRepository;
  constructor() {
    this.UserRepository = new UserRepository();
  }
  async execute(login: string): Promise<boolean> {
    const user: UserInstance = await this.UserRepository.findByLogin(login);

    if (user) return Promise.reject(false);

    return Promise.resolve(true);
  }
}
