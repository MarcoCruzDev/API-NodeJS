const mongoose = require('mongoose');
const User = mongoose.model('User');

//Inicio CRUD
module.exports = {
    async index(req, res) {
        const users = await User.find({});

        return res.json(users);
    },

    //Read
    async show(req, res) {
        const user = await User.findById(req.params.id);
        return res.json(user);
    },

    //Create
    async Store(req, res) {
        const user = await User.create(req.body);

        return res.json(user);
    },

    //Update
    async update(req, res) {
        const user = await User.findOneAndUpdate(req.params.id, req.body, { new: true });

        return res.json(user);
    },

    //Delete
    async remove(req, res) {
        await User.findOneAndRemove(req.params.id);

        return res.send();
    }
};