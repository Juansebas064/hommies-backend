const express = require('express');
const userDataRouter = express.Router();
const getUserData = require('../controllers/getUserDataController.js');


userDataRouter.post('/persona/consultar', getUserData);


module.exports = userDataRouter;