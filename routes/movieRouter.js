import { Router } from 'express';
import movieController from '../app/controllers/movieController.js';

// import all controllers
// import SessionController from './app/controllers/SessionController';

const routes = new Router();

// Add routes
routes.get('/', movieController.getAll);
routes.get('/:id', movieController.getOne);
routes.post('/', movieController.create);
routes.put('/', movieController.update);
routes.delete('/:id', movieController.destroy);

export default routes;
