const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');

const CategorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },

    product: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true,
    }],


});

CategorySchema.plugin(mongoosePaginate);
mongoose.model('Category', CategorySchema);