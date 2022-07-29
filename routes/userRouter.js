import { Router } from 'express';
import userController from '../app/controllers/userController.js';
import authMiddleware from '../middleware/authMiddleware.js';

const routes = new Router();

// Add routes
routes.post('/login', userController.login);
routes.post('/registration', userController.registration);
routes.get('/auth', authMiddleware,userController.check);
// routes.put('/', SessionController.store);
// routes.delete('/', SessionController.store);

export default routes;
