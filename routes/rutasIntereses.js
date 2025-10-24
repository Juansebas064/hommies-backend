import { Router } from 'express';

const routerModificarInteres = Router();
const routerGetIntereses = Router();
const routerInteresesUsuario = Router();
const routerInteresesEvento = Router();
const routerGetInteresesEvento = Router();


import { interesesUsuario, getAllIntereses, modificarIntereses, modificarInteresesEvento, interesesEvento } from '../controllers/controladorIntereses.js';

import verificarAutenticacion from '../middleware/verificarAutenticacion.js';


routerModificarInteres.post('/persona/intereses/modificar', verificarAutenticacion, modificarIntereses);
routerGetIntereses.get('/intereses/consultar', verificarAutenticacion, getAllIntereses);
routerInteresesUsuario.get('/persona/intereses/consultar', verificarAutenticacion, interesesUsuario);
routerInteresesEvento.post('/evento/intereses/modificar', verificarAutenticacion, modificarInteresesEvento);
routerGetInteresesEvento.post('/evento/intereses/consultar', verificarAutenticacion, interesesEvento);

export {
  routerModificarInteres,
  routerGetIntereses,
  routerInteresesUsuario,
  routerInteresesEvento,
  routerGetInteresesEvento
}
