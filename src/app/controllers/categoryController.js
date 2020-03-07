const mongoose = require('mongoose');
const Category = mongoose.model('Category');

//Inicio CRUD
module.exports = {
    async index(req, res) {

        const categories = await Category.find();

        return res.json(categories);
    },

    //Read
    async show(req, res) {
        const cat = req.params.category;
        const category = await Category.find({ name: cat });

        return res.json(category);
    },

    //Create
    async Store(req, res) {
        const category = await Category.create(req.body);

        return res.json(category);
    },

    //Update
    async update(req, res) {
        const category = await Category.findByIdAndUpdate(req.params.id, req.body, { new: true });

        return res.json(category);
    },

    //Delete
    async remove(req, res) {
        await Category.findByIdAndRemove(req.params.id);

        return res.send();
    }
};