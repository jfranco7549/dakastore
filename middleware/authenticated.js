'use strict'
const jwt = require('jsonwebtoken');
var moment = require('moment');
var secret= 'clave-secreta-para-generar-el-token-9999';

exports.authenticated = function(req, res, next){

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