const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const mailer = require('../src/modules/mailer');

const authConfig = require('../src/config/auth.json');

const User = require('./app/models/user');

const routes = express.Router();

// Route users
//const authController = require('./app/controllers/authController');

function generateToken(params = {}) {
    return jwt.sign(params, authConfig.secret, {
        expiresIn: 86400,
    });
}

routes.post('/register', async (req, res) => {
    const { email } = req.body;

    try {
        const userExist = await User.findOne({ email });

        if (userExist) {
            return res.status(400).send('User already exists!!');
        }

        const user = await User.create(req.body);

        user.password = undefined;

        return res.send({
            user,
            token: generateToken({ id: user.id }),
        });
    } catch (error) {
        return res.status(400).send({ error: 'Registation failed!' });
    }
});

routes.post('/authenticate', async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email }).select('+password');

    if (!user)
        return res.status(400).send({ error: 'User no found!' });

    if (!await bcrypt.compare(password, user.password))
        return res.status(400).send({ error: 'Invalid password!' });

    user.password = undefined;

    res.send({
        user,
        token: generateToken({ id: user.id }),
    });
})

routes.post('/forgot_password', async (req, res) => {
    const { email } = req.body;

    try {
        const user = await User.findOne({ email });

        if (!user)
            return res.status(400).send({ error: 'User not found!' });

        const token = crypto.randomBytes(20).toString('hex');

        const now = new Date();
        now.setHours(now.getHours() + 1);

        await User.findByIdAndUpdate(user.id, {
            '$set': {
                passwordResetToken: token,
                passwordResetExpires: now,
            }
        });

        mailer.sendMail({
            to: email,
            from: 'marcocruz92@hotmail.com',
            template: 'auth/forgot_password',
            context: { token },
        }, (error) => {
            if (error)
                return res.status(400).send({ error: 'Cannot send forgot password email' });

            return res.send();
        })

    } catch (error) {
        return res.status(400).send({ error: 'Error on forgot password, try again!' });
    }
});

routes.post('/reset_password/:token', async (req, res) => {
    const { email, password, confirmPassword } = req.body;

    const token = req.params.token;

    if (password !== confirmPassword) {

        return res.send("Confirm password Invalid");
    }

    try {
        const user = await User.findOne({ email })

            .select('+passwordResetToken passwordResetExpires');

        if (!user)
            return res.status(400).send({ error: 'User not found!' });

        if (token !== user.passwordResetToken)
            return res.status(400).send({ error: 'Token invalid' });

        const now = new Date();

        if (now > user.passwordResetExpires)
            return res.status(400).send({ error: 'Token expired, generate a new one' });

        user.password = password;

        await user.save();

        res.send('password successfully changed');


    } catch (error) {
        res.status(400).send({ error: 'Cannot reset password, try again' });
    }
});

module.exports = routes;