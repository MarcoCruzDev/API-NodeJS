const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        unique: true,
        required: true,
        trim: true,
        lowecase: true,
    },

    password: {
        type: String,
        required: true,
        trim: true,
        select: false,
        minlength: 6,
    },



    passwordResetToken: {
        type: String,
        trim: true,
        select: false
    },

    passwordResetExpires: {
        type: Date,
        select: false,
    },

    phone: {
        type: Number,
        required: true,
        trim: true,
        maxlength: 9,
    },

    location: {
        type: String,
        required: true,
        trim: true,
    },



});

// Incriptação de password
UserSchema.pre('save', async function (next) {
    const hash = await bcrypt.hash(this.password, 10);
    this.password = hash;

    next();
});

UserSchema.plugin(mongoosePaginate);
const User = mongoose.model('User', UserSchema);

module.exports = User;