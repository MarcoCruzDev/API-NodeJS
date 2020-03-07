const express = require('express');
const routes = express.Router();

// Route products
const productController = require('./app/controllers/productController');
routes.get("/products", productController.index);
routes.get('/products/:id', productController.show);
routes.post('/products', productController.Store);
routes.put('/products/:id', productController.update);
routes.delete('/products/:id', productController.remove);

module.exports = routes;