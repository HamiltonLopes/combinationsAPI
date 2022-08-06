import { Router } from 'express';
import CombinationController from '../presentation/controllers/CombinationController.js'
import { ControllerCombinationsById } from '../presentation/controllers/controller-combinations-by-id.js'
import { ControllerTopCombinations } from '../presentation/controllers/controller-top-combinations.js'
// import dotenv from 'dotenv';
// dotenv.config();


const Routes = new Router();

Routes.get('/', (req, res) => res.send('Combinations-API - Endpoint padrão!'));

Routes.post('/orderProcessor', CombinationController.store);
Routes.get('/combinations-by-id', ControllerCombinationsById.handle)
Routes.get('/store-top-combinations', ControllerTopCombinations.handle)

export default Routes;

