import { Router } from 'express';
import AuthRoutes from '@modules/auth/infra/http/routes';

const v1Router = Router();

v1Router.use(AuthRoutes);

export default v1Router;
