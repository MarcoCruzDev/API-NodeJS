const express = require('express');
const routes = express.Router();

// Route users
const userController = require('./app/controllers/userController ');
routes.get("/users", userController.index);
routes.get('/users/:id', userController.show);
routes.post('/users', userController.Store);
routes.put('/users/:id', userController.update);
routes.delete('/users/:id', userController.remove);

module.exports = routes;