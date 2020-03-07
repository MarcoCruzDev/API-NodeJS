const express = require('express');
const routes = express.Router();

// Route categorys
const categoryController = require('./app/controllers/categoryController');
routes.get("/categories", categoryController.index);
routes.get('/categories/:category', categoryController.show);
routes.post('/categories', categoryController.Store);
routes.put('/categories/:id', categoryController.update);
routes.delete('/categories/:id', categoryController.remove);
module.exports = routes;