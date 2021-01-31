import jwt from 'jsonwebtoken';

import {
  Authentication,
  UserInstance,
} from '@shared/infra/postgres/models/User';
import IProvider from '@shared/core/IProvider';
import authConfig from '@config/auth';

export default class TokenProvider
  implements IProvider<UserInstance, Authentication> {
  provide(user: UserInstance): Authentication | Promise<Authentication> {
    const { secret, expiresIn } = authConfig;
    return {
      token: jwt.sign({ login: user.login }, secret, { expiresIn }),
      expires: new Date(
        new Date().setDate(new Date().getDate() + Number(expiresIn.charAt(0))),
      ),
    };
  }
}
