'use strict'
const jwt = require('jsonwebtoken');

exports.authenticated = function (req, res, next) {
/*
* Normally JWTs are specified as Bearer Tokens.
* Authorization Header will have something like 'Bearer <token>' 
*/
  const header = req.headers.authorization;

  if (header) {
    const token = header.slice(7, header.length);
    const secretKey = 'mySecretKey';
    try {
       
        jwt.verify(token, secretKey, (err, decoded) => {
          if (err) {
            return res.status(401).json({ message: 'Invalid token' });
          }
      
          req.user = decoded;
          next();
        });
      next();
    } catch (error) {
      next(new Error('Authentication Failed'));
    }
  } else {
    next(new Error('Missing Authentication Token'));
  }
}
