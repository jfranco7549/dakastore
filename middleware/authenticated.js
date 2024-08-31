'use strict'
const jwt = require('jsonwebtoken');
var moment = require('moment');
var secret = 'clave-secreta-para-generar-el-token-9999';

exports.authenticated = function (req, res, next) {

  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }
  const secretKey = 'mySecretKey';
  jwt.verify(token, secretKey, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: 'Invalid token' });
    }

    req.user = decoded;
    next();
  });

  //Comprobar si el token ha expirado



  //Adjuntar usuario identificado a request

  //Hacer el next

  console.log("estas pasando por el middleware")

}


exports.authenticatedSpareParts = function (req, res, next) {

  const token = req.headers.authorization;
  console.log('req', token)

  if (!token) {
    return res.render('sign-in');
  }
  const secretKey = 'mySecretKey';

  jwt.verify(token, secretKey, (err, decoded) => {
    console.log('en el middle', err)
    //req.setHeader("Authorization", token);
    if (err) {
      return res.status(401).json({ message: 'Invalid token' });
    }

    console.log("estas pasando por el middleware")


  });

  //Comprobar si el token ha expirado



  //Adjuntar usuario identificado a request

  //Hacer el next

  console.log("estas pasando por el middleware")
  next();

}