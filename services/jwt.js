'use strict'

const jwt = require('jsonwebtoken');
var moment = require('moment');

exports.createToken = function (user) {
  

    var payload = {
        sub: user._id,
        name: user.name,
        surname: user.lastname,
        email: user.email,
        role: user.role,
        image: user.image,
        password: user.password
    }
    const secretKey = 'mySecretKey';
    const options = { expiresIn: '1h' };
    const token = jwt.sign(payload, secretKey, options);
    return token;
}

