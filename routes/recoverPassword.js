import { Router } from 'express';
const routerRecoverPass = Router();
const routerRecoverPassToken = Router();
const routerChangePass = Router();
import { 
  recuperarPassToken, 
  // recuperarPass, 
  cambiarPass } 
  from '../controllers/recoverPassword.js';


// routerRecoverPass.post('/usuario/recuperar-cuenta', recuperarPass);
routerRecoverPassToken.post('/usuario/recuperar-cuenta-token', recuperarPassToken);
routerChangePass.post('/usuario/cambiar-contrasena', cambiarPass)

export {
  routerChangePass,
  routerRecoverPassToken,
  // routerRecoverPass
}
