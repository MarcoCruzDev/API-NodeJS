const mongoose = require('mongoose');
const Auth = mongoose.model('auth');

//Inicio CRUD

//Update
module.exports = {


    async update(req, res) {
        const auth = await Auth.findByIdAndUpdate(req.params.id, req.body, { new: true });

        return res.json(auth);
    },

};