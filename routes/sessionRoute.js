import { Router } from 'express';
const routerJWT = Router();
import JWTController from '../controllers/JWTController.js';


routerJWT.post('/create/JWT', JWTController);


export default routerJWT;