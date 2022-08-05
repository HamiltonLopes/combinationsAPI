import { Router } from 'express';
import { ControllerSessions } from './app/controllers/controller-sessions.js';
import CombinationController from './app/controllers/CombinationController.js';
import { ControllerCombinationsById } from '../src/app/controllers/controller-combinations-by-id.js';
import { ControllerTopCombinations } from '../src/app/controllers/controller-top-combinations.js';
import Session from './app/middlewares/Session.js';

const Routes = new Router();

Routes.get('/', (_, res) => res.send('Combinations-API - Endpoint padrão!'));

Routes.post('/session', ControllerSessions.handle);
Routes.post('/orderProcessor', CombinationController.store);
Routes.post('/combinations-by-id', ControllerCombinationsById.handle);
Routes.get('/store-top-combinations', ControllerTopCombinations.handle);

export default Routes;
