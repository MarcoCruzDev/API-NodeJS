const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');

const ProductSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },

    description: {
        type: String,
        required: true,
    },

    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },

    category: {
        type: String,
        ref: 'Category',
        required: true,

    },


    price: {
        type: Number,
        required: true,
        maxlength: 10,
    },

    image: {
        type: String,
        trim: true,
    },

    creatDate: {
        type: Date,
        deault: Date.now,
    },
});

ProductSchema.plugin(mongoosePaginate);
mongoose.model('Product', ProductSchema);