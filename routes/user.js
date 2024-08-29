'use strict'

var express = require('express');
var UserController = require('../controllers/user');
var md_auth = require('../middleware/authenticated');
const sendEmail = require("../utils/sendEmail");
var jwt = require('../services/jwt');
var User = require('../models/user');
const nodemailer = require("nodemailer");
var moment = require('moment');
const speakeasy = require('speakeasy');
var router = express.Router();

router.get('/probando', UserController.probando);
router.post('/testeando', UserController.testeando);


//Rutas usuarios
router.post('/register', UserController.save);
router.post('/login', UserController.login);
router.put('/update', md_auth.authenticated, UserController.update)
router.get('/users', UserController.getUsers)
router.put('/changePassword', md_auth.authenticated, UserController.changePassword)
router.get('/user/:userId', UserController.getUser)
router.post("/resetPasssword", async (req, res) => {
    try {

        const user = await User.findOne({ email: req.body.email });
        const secret = user.temp;
        var token = req.body.otp

        const code = speakeasy.totp({

            // Use the Base32 encoding of the secret key
            secret: secret.base32,

            // Tell Speakeasy to use the Base32 
            // encoding format for the secret key
            encoding: 'base32'
        });
        console.log('tokenValidates', code)
        if (!user)
            return res.status(400).send("user with given email doesn't exist");


        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: 'karlat2811@gmail.com',
                pass: 'ryxq tlun mjkg tqao',
            },
        });

        const mailOptions = {
            from: 'karlat2811@gmail.com',
            to: 'kvtr1993@gmail.com',
            subject: 'Password reset OTP',
            text: `Your OTP (It is expired after 1 min) : ${code}`,
        };

        transporter.sendMail(mailOptions, (error, info) => {
            console.log('eeeeeey', error)
        });


        res.send("password reset link sent to your email account");
    } catch (error) {
        res.send("An error occured");
        console.log(error);
    }
});
router.post('/newPassword', async (req, res) => {
    const { email, otp, password } = req.body;
    try {
        // Retrieve user from database
        const user = await User.findOne({ email: email });
        const secret = user.temp.base32;
        console.log({ user })

        // Returns true if the token matches

        console.log('tokenValidates', secret, otp)

        const tokenValidates = speakeasy.totp.verify({
            secret: secret,
            encoding: 'base32',
            token: otp,
            window: 1
        });

        console.log('valid', secret, otp, tokenValidates)
        if (tokenValidates) {

            const user = await User.findOneAndUpdate({ email: req.body.email }, { password: password });

            res.json({ validated: true, user, })
        } else {
            res.json({ validated: false, message: 'Token Inválido' })
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error retrieving user' })
    };







}),

router.post("/validate", async (req, res) => {
        const { email, token } = req.body;
        try {
            // Retrieve user from database
            const user = await User.findOne({ email: email });
            console.log({ user })
            const { secret } = user.temp;
            // Returns true if the token matches
            const tokenValidates = speakeasy.totp.verify({
                secret,
                encoding: 'base32',
                token,
                window: 1
            });
            if (tokenValidates) {
                res.json({ validated: true })
            } else {
                res.json({ validated: false })
            }
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Error retrieving user' })
        };
})



module.exports = router;