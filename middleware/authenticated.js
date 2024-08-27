'use strict'
var jwt = require('jwt-simple');
var moment = require('moment');
var secret= 'clave-secreta-para-generar-el-token-9999';

exports.authenticated = function(req, res, next){

    //Comprobar si nos llega autorización
        if(!req.headers.authorization){
           return  res.status(403).send({
                message: 'La petición no tiene la cabecera de autorización'
            })
        }
    //Limpiar el token y quitar comillas
        var token = req.headers.authorization.replace(/['"]+/g, '');

   

    try{
        //Decodificar el token
        var payload = jwt.decode(token, secret)

        if(payload.exp <= moment().unix()){
            return  res.status(403).send({
                message: 'El token ha expirado'
            })     
        }

        req.user = payload;
        
    }catch(ex){

        return  res.status(403).send({
            message: 'El token no es válido'
        })
    }


    //Comprobar si el token ha expirado



    //Adjuntar usuario identificado a request

    //Hacer el next

    console.log("estas pasando por el middleware")
    
    next();
}