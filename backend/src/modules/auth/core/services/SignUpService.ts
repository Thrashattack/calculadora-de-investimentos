import UserRepository from '@modules/auth/infra/postgres/repositories/UserRepository';
import PasswordProvider from '@modules/auth/core/providers/PasswordProvider';
import TokenProvider from '@modules/auth/core/providers/TokenProvider';

import IProvider from '@shared/core/IProvider';
import IService from '@shared/core/IService';

import {
  UserInstance,
  Authentication,
} from '@shared/infra/postgres/models/User';

export default class SignUpService
  implements IService<UserInstance, Promise<Authentication>> {
  private UserRepository: UserRepository;
  private PasswordProvider: IProvider<string, string>;
  private TokenProvider: IProvider<UserInstance, Authentication>;

  constructor() {
    this.UserRepository = new UserRepository();
    this.PasswordProvider = new PasswordProvider();
    this.TokenProvider = new TokenProvider();
  }
  async execute(newUser: UserInstance): Promise<Authentication> {
    newUser.password = this.PasswordProvider.provide(
      newUser.password,
    ) as string;

    const user = await this.UserRepository.save(newUser);

    if (!user) {
      throw new Error('Failed to create new user');
    }

    return this.TokenProvider.provide(user);
  }
}
