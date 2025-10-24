import { Router } from 'express';
const userDataRouter = Router();
import getUserData from '../controllers/getUserDataController.js';


userDataRouter.post('/persona/consultar', getUserData);


export default userDataRouter;