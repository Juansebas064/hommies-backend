import { Router } from 'express';
const routerRegister = Router();
import googleRegister from '../controllers/controladorModuloRegistroGoogle.js';


routerRegister.post('/register/verify/google', googleRegister);


export default routerRegister;
