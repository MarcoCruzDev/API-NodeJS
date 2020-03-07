const mongoose = require('mongoose');

const Product = mongoose.model('Product');

//Inicio CRUD
module.exports = {
    async index(req, res) {

        const product = await Product.find({});


        return res.json(product);
    },

    //Read
    async show(req, res) {
        const product = await Product.findById(req.params.id);

        return res.json(product);
    },


    //Create
    async Store(req, res) {
        const product = await Product.create(req.body);

        return res.json(product);
    },

    //Update
    async update(req, res) {
        const product = await Product.findOneAndUpdate(req.params.id, req.body, { new: true });

        return res.json(product);
    },

    //Delete
    async remove(req, res) {
        await Product.findByIdAndRemove(req.params.id);

        return res.send('product deleted!');
    }
};