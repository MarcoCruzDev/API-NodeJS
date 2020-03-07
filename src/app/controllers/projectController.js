const express = require('express');
const authMiddleware = require('../middlewares/auth');
const Product = require('../models/product');
const Category = require('../models/category');
const router = express.Router();

router.use(authMiddleware);

//Router Product
router.get('/', async (req, res) => {
    try {
        const products = await Product.find().populate('user');

        return res.send({ products });

    } catch (error) {
        return res.status(400).send({ error: 'Error loading products!' });
    }
});


router.get('/:productId', async (req, res) => {
    try {
        const product = await Product.findById(req.params.productId).populate('user');

        return res.send({ product });

    } catch (error) {
        return res.status(400).send({ error: 'Error loading products!' });
    }
});

router.post('/', async (req, res) => {
    try {
        const product = await product.create({ ...req.body, user: req.userId });

        return res.send({ product });
    } catch (error) {
        return res.status(400).send({ error: 'Error creating new product!' });
    }
});

router.put('/:productId', async (req, res) => {
    res.send({ user: req.userId });
});

router.delete('/:productId', async (req, res) => {
    try {
        await Product.findByIdAndRemove(req.params.productId).populate('user');

        return res.send();

    } catch (error) {
        return res.status(400).send({ error: 'Error deleting products!' });
    }
});


//Router Product
router.get('/', async (req, res) => {
    try {
        const products = await Product.find().populate('user');

        return res.send({ products });

    } catch (error) {
        return res.status(400).send({ error: 'Error loading products!' });
    }
});


router.get('/:productId', async (req, res) => {
    try {
        const product = await Product.findById(req.params.productId).populate('user');

        return res.send({ product });

    } catch (error) {
        return res.status(400).send({ error: 'Error loading products!' });
    }
});

router.post('/', async (req, res) => {
    try {
        const product = await product.create({ ...req.body, user: req.userId });

        return res.send({ product });
    } catch (error) {
        return res.status(400).send({ error: 'Error creating new product!' });
    }
});

//Router Category
router.put('/:categoryId', async (req, res) => {
    res.send({ product: req.productId });
});

router.delete('/:categoryId', async (req, res) => {
    try {
        await Category.findByIdAndRemove(req.params.categoryId).populate('product');

        return res.send();

    } catch (error) {
        return res.status(400).send({ error: 'Error deleting category!' });
    }
});




module.exports = app => app.use('/projects', router);
