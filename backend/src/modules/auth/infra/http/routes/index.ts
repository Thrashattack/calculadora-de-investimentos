import { rules } from '@modules/auth/infra/http/validators';
import { Router } from 'express';
import AuthController from '@modules/auth/infra/http/controllers';
import ensureAuthenticated from '@shared/infra/http/middlewares/ensureAuthentication';
import validationsInterceptor from '@shared/infra/http/middlewares/validateRequest';

const controller = new AuthController();

export default Router()
  .use(ensureAuthenticated)
  .put('/signin', rules.signin, validationsInterceptor, controller.put)
  .post('/signup', rules.signup, validationsInterceptor, controller.post)
  .get('/verify/:login', rules.verify, validationsInterceptor, controller.get);
