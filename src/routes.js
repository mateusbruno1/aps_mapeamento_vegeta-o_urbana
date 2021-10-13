import { Router } from 'express';
import multer from 'multer';
import TreeController from './app/controllers/TreeController';

import FileController from './app/controllers/FileController';

import SessionController from './app/controllers/SessionController';
import UserController from './app/controllers/UserController';
import authMiddleware from './app/middlewares/auth';
import multerConfig from './config/multer';

const upload = multer(multerConfig);

const routes = new Router();
routes.post('/users', UserController.store);
routes.post('/usersWeb', UserController.storeWeb);
routes.post('/sessions', SessionController.store);
routes.post('/sessionsWeb', SessionController.storeWeb);

routes.get('/Tree', TreeController.find);
routes.get('/Tree/:id', TreeController.findId);

routes.use(authMiddleware);

routes.get('/users', UserController.find);

routes.post('/Tree', TreeController.store);

routes.post('/files', upload.array('file'), FileController.store);

routes.put('/Tree/:id', TreeController.update);

routes.put('/users', UserController.update);

routes.delete('/Tree/:id', TreeController.delete);

export default routes;
