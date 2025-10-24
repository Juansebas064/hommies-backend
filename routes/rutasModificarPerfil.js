import { Router } from 'express';

const routerModificar = Router();

import modificarPerfil from '../controllers/controladorModuloModificarPerfil.js';


import verificarAutenticacion from '../middleware/verificarAutenticacion.js';
import { uploadAvatars } from '../api/multer.js';

routerModificar.put('/perfil/modificar', uploadAvatars.single('foto'), verificarAutenticacion, modificarPerfil);

export default routerModificar;
