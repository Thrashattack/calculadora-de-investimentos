/* eslint-disable @typescript-eslint/no-unused-vars */
import { Request, Response } from 'express';

import SignInService from '@modules/auth/core/services/SignInService';
import SignUpService from '@modules/auth/core/services/SignUpService';

import IController from '@shared/infra/http/IController';
import VerifyUserExistentService from '@modules/auth/core/services/VerifyExistentUserService';
import { UserInstance } from '@shared/infra/postgres/models/User';

export default class AuthenticationController
  implements IController<Request, Response> {
  post = async (req: Request, res: Response): Promise<Response> => {
    try {
      const user = req.body as UserInstance;

      const signInResult = await new SignInService().execute(user);
      return res.json(signInResult);
    } catch (error) {
      return res.json({ error: (error as Error).message });
    }
  };
  put = async (req: Request, res: Response): Promise<Response> => {
    try {
      const user = req.body as UserInstance;

      const signUpResult = await new SignUpService().execute(user);

      return res.json(signUpResult);
    } catch (error) {
      return res.json({ error: (error as Error).message });
    }
  };
  get = async (req: Request, res: Response): Promise<Response> => {
    try {
      const { login } = req.params;

      const verifyResult = await new VerifyUserExistentService().execute(login);

      return res.json(verifyResult);
    } catch (error) {
      return res.json({ error: (error as Error).message });
    }
  };
  patch(_req: Request, _res: Response): Promise<Response> {
    throw new Error('Method not implemented.');
  }
  delete(_req: Request, _res: Response): Promise<Response> {
    throw new Error('Method not implemented.');
  }
}
