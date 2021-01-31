import UserRepository from '@modules/auth/infra/postgres/repositories/UserRepository';
import {
  UserInstance,
  Authentication,
} from '@shared/infra/postgres/models/User';

import PasswordProvider from '@modules/auth/core/providers/PasswordProvider';
import TokenProvider from '@modules/auth/core/providers/TokenProvider';

import IService from '@shared/core/IService';
import IProvider from '@shared/core/IProvider';

export default class SignInService
  implements IService<UserInstance, Promise<Authentication>> {
  private UserRepository: UserRepository;
  private PasswordProvider: IProvider<string, string>;
  private TokenProvider: IProvider<UserInstance, Authentication>;
  constructor() {
    this.UserRepository = new UserRepository();
    this.PasswordProvider = new PasswordProvider();
    this.TokenProvider = new TokenProvider();
  }
  async execute(request: UserInstance): Promise<Authentication> {
    const { login, password } = request;

    const user: UserInstance = await this.UserRepository.findByLogin(login);

    const isPasswordCorrect =
      user.password === (this.PasswordProvider.provide(password) as string);

    if (!user || !isPasswordCorrect) {
      throw new Error('User or Password is Incorrect');
    }

    return this.TokenProvider.provide(user) as Authentication;
  }
}
