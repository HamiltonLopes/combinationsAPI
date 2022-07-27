import { Router } from 'express';
import dotenv from 'dotenv';
dotenv.config();

const Routes = new Router();

Routes.get('/', (req, res) => res.send('Combinations-API - Endpoint padrão!'));



export default Routes;