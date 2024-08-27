'use strict'

var validator = require('validator');
var User = require('../models/user');
var bcrypt = require('bcrypt-nodejs');
var jwt = require('../services/jwt');
const user = require('../models/user');


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

    save: function (req, res) {
        //Recoger los parametros de la peticion
        var params = req.body;
        console.log('body', req.params)
        //Validar los datos

        try {
            var validate_name = !validator.isEmpty(params.name);
            var validate_surname = !validator.isEmpty(params.lastname);
            var validate_email = !validator.isEmpty(params.email) && validator.isEmail(params.email);
            var validate_password = !validator.isEmpty(params.password);
            console.log("params", req.body)
        } catch (err) {
            return res.status(200).send({
                message: 'Faltan datos por enviar'
            })
        }

        if (validate_name && validate_surname && validate_password && validate_email) {
            //Crear objeto de usuario
            var user = new User();

            //Asignar valores al usuario
            user.name = params.name;
            user.lastname = params.lastname;
            user.password = params.password;
            user.role = params.role;
            user.email = params.email.toLowerCase();
            console.log("params", params)
            //Comprobar si el usuario existe, 
            User.findOne({ email: user.email }).then(issetUser => {

                if (issetUser) {
                    return res.status(500).send({
                        message: 'Error al comprobar duplicidad de usuario'
                    })
                }


                if (!issetUser) {
                    //si no existe cifrar la contraseña
                    bcrypt.hash(params.password, null, null, (err, hash) => {
                        user.password = hash;
                    })

                    //guardar

                    user.save().then((userStored) => {
                        //Devolver respuesta
                        return res.status(200).send({
                            message: 'El usuario se ha guardado con éxito',
                            user: userStored
                        })
                    }).catch((err) => {
                        console.log('err')
                        if (err) {
                            return res.status(500).send({
                                message: 'Error al guardar usuario'
                            })
                        }

                    })
                } else {
                    return res.status(500).send({
                        message: 'Usuario ya existe'
                    })
                }

            })

        } else {
            return res.status(500).send({
                message: 'Oops',
                params: params
            })

        }


    },

    login: function (req, res) {
        var params = req.body
        var validate_email = !validator.isEmpty(params.email);
        var validate_password = !validator.isEmpty(params.password);
        if (!validate_email || !validate_password) {
            return res.status(500).send({
                message: 'Parametros incorrectos'
            })
        }
        var user = new User();
        user.email = params.email.toLowerCase();
        user.password = params.password;
        User.findOne({ email: params.email.toLowerCase() }).then((check) => {


            bcrypt.compare(params.password, check.password, function (err, resp) {

                if (err) {
                    return res.status(400).send({
                        message: 'Error al validar'
                    })
                }

                if (check) {
                    if (params.gettoken) {
                        return res.status(200).send({
                            token: jwt.createToken(user)
                        })
                    } else {

                        user.password = undefined;

                        const JWT = `eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiI2NmNkZmI4YTJkZTAwZDAyOTRjYjM5YzgiLCJlbWFpbCI6Imp1bEBnbWFpbC5jb20iLCJpYXQiOjE3MjQ3NzUzMDYsImV4cCI6MTcyNDc4OTcwNn0.tUgWgzW8-e2FuPH3CXqoDeP1KgyJqcNG2A_p_qec96U`;
                        const decodedJwt = JSON.parse(atob(JWT.split(".")[1]));
                        console.log('decode', decodedJwt)
                        if (decodedJwt.exp * 1000 < Date.now()) {
                            console.log('expiro')
                        } else {
                            console.log('no expiro')
                        }
                        return res.status(200).send({
                            status: "success",
                            user,
                            token: jwt.createToken(user)
                        })
                    }
                } else {
                    return res.status(500).send({
                        message: 'El usuario no existe'
                    })
                }
            })

        }).catch((err) => {

            if (err) {
                return res.status(400).send({
                    message: 'Error al intentar identificarse'
                })
            }

            if (!user) {
                return res.status(500).send({
                    message: 'El usuario no existe'
                })
            }
        })


    },

    update: function (req, res) {
        //Crear middleware para comprobar el jwt token, ponerselo a la ruta
        var params = req.body;
        //Recoger datos del usuario
        try {
            var validate_name = !validator.isEmpty(params.name);
            var validate_surname = !validator.isEmpty(params.lastname);
            var validate_email = !validator.isEmpty(params.email) && validator.isEmail(params.email);

        } catch (err) {
            return res.status(200).send({
                message: 'Faltan datos por enviar'
            })
        }

        //Eliminar propiedades innecesarias
        delete params.password;
        console.log("hey", req.user.sub)
        var userId = params._id;

        console.log("params", params, userId)
        //Buscar y actualizar documento

        //Comprobar si el email es unico

        if (req.user.email !== params.email) {
            //Comprobar si el usuario existe, 
            User.findOne({ email: params.email.toLowerCase() })
                .then(issetUser => {
                    if (issetUser && issetUser.email == params.email) {
                        return res.status(200).send({
                            message: 'El email no puede ser modificado 1'
                        })

                    } else {
                        User.findByIdAndUpdate({ _id: userId }, params, { new: true }).then(userUpdated => {
                            if (!userUpdated) {
                                return res.status(200).send({
                                    status: 'success',
                                    message: 'Error al actualizar usuario'
                                })
                            }


                            //Devolver respuesta
                            return res.status(200).send({
                                status: 'success',
                                user: userUpdated,
                            })
                        }).catch((err) => {
                            if (err) {
                                return res.status(500).send({
                                    status: 'error',
                                    message: 'Error al actualizar usuario'
                                })
                            }
                        })
                    }

                }).catch((err) => {
                    if (err) {
                        return res.status(500).send({
                            message: 'Error al comprobar duplicidad de usuario'
                        })
                    }
                })
        } else {
            User.findByIdAndUpdate({ _id: userId }, params, { new: true }).then(userUpdated => {

                if (err) {
                    return res.status(500).send({
                        status: 'error',
                        message: 'Error al actualizar usuario'
                    })
                }

                if (!userUpdated) {
                    return res.status(200).send({
                        status: 'success',
                        message: 'Error al actualizar usuario'
                    })
                }


                //Devolver respuesta
                return res.status(200).send({
                    status: 'success',
                    user: userUpdated,
                    message: "Hey"
                })
            })
                .catch((err) => {

                    if (err) {
                        return res.status(500).send({
                            status: 'error',
                            message: 'Error al actualizar usuario'
                        })
                    }
                })
        }




    },
    getUsers: function (req, res) {
        User.find().exec()
            .then(users => {
                return res.status(200).send({
                    status: 'success',
                    users: users
                })
            }).catch((err) => {
                if (err || !users) {
                    return res.status(404).send({
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
          
            return res.status(200).send({
                status: 'success',
                user: user
            })
        })
        .catch((err)=>{
            if (err || !user) {
                return res.status(404).send({
                    status: 'error',
                    message: 'No existe el usuario'
                })
            }

        })

    }






}


module.exports = controller;