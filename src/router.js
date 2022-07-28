import { Router } from 'express';
import dotenv from 'dotenv';
import CombinationController from './app/controllers/CombinationController.js'
dotenv.config();

const Routes = new Router();

Routes.get('/', (req, res) => res.send('Combinations-API - Endpoint padrão!'));

Routes.post('/orderProcessor', CombinationController.store);

export default Routes;