import { Router } from 'express';
const routerNormalRegister = Router();
import normalRegister from '../controllers/controladorModuloRegistroNormal.js';


routerNormalRegister.post('/register/user', normalRegister);


export default routerNormalRegister;