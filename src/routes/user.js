const UserController = require('../controllers/user');
const express = require('express');

const UserRouter = express.Router();

UserRouter.post('/', UserController.create);
UserRouter.get('/', UserController.read);
UserRouter.get('/:id', UserController.readOne);
UserRouter.patch('/:id', UserController.update);
UserRouter.delete('/:id', UserController.destroy);

module.exports = UserRouter;
