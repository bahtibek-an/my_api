import { Router } from 'express';

// import all controllers
import userController from '../app/controllers/userController.js';
import authMiddleware from '../middleware/AuthMiddleware.js';

const routes = new Router();

// Add routes
routes.post('/login', userController.login);
routes.post('/registration', userController.registration);
routes.get('/auth', authMiddleware,userController.check);
// routes.put('/', SessionController.store);
// routes.delete('/', SessionController.store);

export default routes;
