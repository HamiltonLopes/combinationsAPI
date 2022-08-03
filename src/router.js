import { Router } from 'express';
import dotenv from 'dotenv';
import CombinationController from './app/controllers/CombinationController.js'
import { ControllerCombinationsById } from '../src/app/controllers/controller-combinations-by-id.js'
import { ControllerTopCombinations } from '../src/app/controllers/controller-top-combinations.js'
 dotenv.config();

const Routes = new Router();

Routes.get('/', (req, res) => res.send('Combinations-API - Endpoint padrão!'));

Routes.post('/orderProcessor', CombinationController.store);
Routes.get('/combinations-by-id', ControllerCombinationsById.handle)
Routes.get('/store-top-combinations', ControllerTopCombinations.handle)

export default Routes;