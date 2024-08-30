'use strict'

var validator = require('validator');
var User = require('../models/user');
var bcrypt = require('bcrypt-nodejs');
var jwt = require('../services/jwt');
const user = require('../models/user');
const mongoose = require('mongoose');
const speakeasy = require('speakeasy');

var controller = {

    probando: function (req, res) {
        return res.status(200).send({
            message: 'Conexion con la api'
        })
    },


    testeando: function (req, res) {
        return res.status(200).send({
            message: 'Soy el método TESTEANDO'
        })
    },

    save: async function (req, res) {
        //Recoger los parametros de la peticion
        var params = req.body;

        //Validar los datos
        try {
            var validate_name = !validator.isEmpty(params.name);
            var validate_surname = !validator.isEmpty(params.lastname);
            var validate_email = !validator.isEmpty(params.email) && validator.isEmail(params.email);
            var validate_password = !validator.isEmpty(params.password);
        } catch (err) {
            res.status(200).send({
                message: 'Faltan datos por enviar'
            })
        }

        if (validate_name && validate_surname && validate_password && validate_email) {
            //Crear objeto de usuario
            var user = new User();

            //Asignar valores al usuario
            user.name = params.name;
            user.lastname = params.lastname;
            user.role = params.role;
            user.email = params.email.toLowerCase();
            user.temp =  speakeasy.generateSecret();
            //Comprobar si el usuario existe, 
            const userData = await User.findOne({ email: params.email.toLowerCase() })

            if (userData) {
                bcrypt.hash(params.password, null, null, (err, hash) => {
                    user.password = hash;
                })

                //guardar

                user.save().then((userStored) => {
                    //Devolver respuestas
                    res.status(200).send({
                        message: 'El usuario se ha guardado con éxito',
                        user: user
                    })
                }).catch((err) => {
                    console.log('err')
                    if (err) {
                        res.status(500).send({
                            message: 'Error al guardar usuario'
                        })
                    }

                })

            } else {

                res.status(500).send({
                    message: 'Error al comprobar duplicidad de usuario'
                })



            }

        } else {
            res.status(500).send({
                message: 'Oops error en los parametros enviados',
                params: params
            })

        }


    },

    login: async function (req, res) {
        var params = req.body
        var validate_email = !validator.isEmpty(params.email);
        var validate_password = !validator.isEmpty(params.password);
        if (!validate_email || !validate_password) {
            res.status(500).send({
                message: 'Parametros incorrectos'
            })
        }
        var user = new User();
        user.email = params.email.toLowerCase();
        const userData = await User.findOne({ email: params.email.toLowerCase() })
        if (userData) {
            bcrypt.compare(params.password, userData.password, function (err, resp) {

                if (err) {
                    res.status(400).send({
                        message: 'Error al validar'
                    })
                }

                res.status(200).send({
                    status: "success",
                    userData,
                    token: jwt.createToken(userData)
                })

            })
        }
        else {

            res.status(400).send({
                message: 'El usuario no existe'
            })

        }

    },

    update: async function (req, res, next) {
        //Crear middleware para comprobar el jwt token, ponerselo a la ruta
        var params = req.body;
        //Recoger datos del usuario
        try {
            var validate_name = !validator.isEmpty(params.name);
            var validate_surname = !validator.isEmpty(params.lastname);
            var validate_email = !validator.isEmpty(params.email) && validator.isEmail(params.email);

        } catch (err) {

            res.status(400).send({
                status: 'success',
                message: 'Faltan datos por enviar',
            })

        }


        //Eliminar propiedades innecesarias
        delete params.password;
        var userId = new mongoose.Types.ObjectId(req.user.sub);
        //Buscar y actualizar documento


        const filter = { _id: userId };
        const filterExist = { email: params.email };
        const update = { name: params.name, lastname: params.lastname, email: params.email };

        //Comprobar si el email es unico
        var doc = await User.findOne(filterExist);

        if (!doc) {
            const response = await User.findOneAndUpdate(filter, update, {
                new: true,
                upsert: true,
                // Return additional properties about the operation, not just the document
                includeResultMetadata: true
            });

            res.status(202).send({
                status: 'success',
                message: 'Datos actualizados exitosamente',
                res: response.value
            })
        }

        if (doc !== null && doc._id == req.user.sub) {
            const response = await User.findOneAndUpdate(filter, update, {
                new: true,
                upsert: true,
                // Return additional properties about the operation, not just the document
                includeResultMetadata: true
            });
            res.status(202).send({
                status: 'success',
                message: 'Datos actualizados exitosamente',
                res: response.value
            })
        } else {
            res.status(400).send({
                status: 'error',
                message: 'El email ingresado ya existe',
            })
        }


    },
    getUsers: function (req, res) {
        User.find().exec()
            .then(users => {
                res.status(200).send({
                    status: 'success',
                    users: users
                })
            }).catch((err) => {
                if (err || !users) {
                    res.status(404).send({
                        status: 'error',
                        message: 'No hay usuarios que mostrar'
                    })
                }
            })

    },
    getUser: function (req, res) {

        var userId = req.params.userId

        User.findById(userId).exec()
            .then(user => {
                if (user) {
                    res.status(200).send({
                        status: 'success',
                        user: user
                    })
                } else {
                    res.status(404).send({
                        status: 'error',
                        message: 'No existe el usuario'
                    })
                }

            })
            .catch((err) => {
                if (err || !user) {
                    res.status(404).send({
                        status: 'error',
                        message: 'No existe el usuario'
                    })
                }

            })

    },
    changePassword: async function (req, res) {
        var params = req.body;

        try {
            var validate_oldPassword = !validator.isEmpty(params.oldPassword);
            var validate_newPassword = !validator.isEmpty(params.newPassword);
            var email = !validator.isEmpty(params.email);

        } catch (err) {

            res.status(400).send({
                status: 'success',
                message: 'Faltan datos por enviar',
            })

        }

        const userData = await User.findOne({ email: params.email.toLowerCase() })

        bcrypt.compare(params.oldPassword, userData.password, async function (err, resp) {
            if (err) {
                res.status(400).send({
                    message: 'Error al validar'
                })
            }

            if (resp) {
                const filter = { email: params.email };
                var newPassword;
                await bcrypt.hash(params.newPassword, null, null, (err, hash) => {
                    newPassword = hash
                })
                const update = { password: newPassword };
                const response = await User.findOneAndUpdate(filter, update, {
                    new: true,
                    upsert: true,
                    // Return additional properties about the operation, not just the document
                    includeResultMetadata: true
                });

                res.status(202).send({
                    status: 'success',
                    message: 'Password actualizado exitosamente',
                    res: response.value
                })
            } else {
                res.status(202).send({
                    status: 'error',
                    message: 'Password incorrecto',
                })
            }
        })

    }






}


module.exports = controller;