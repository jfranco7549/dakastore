'use strict'

var express = require('express');
var UserController = require('../controllers/user');
var md_auth = require('../middleware/authenticated');

var router = express.Router();

router.get('/probando', UserController.probando);
router.post('/testeando', UserController.testeando);


//Rutas usuarios
router.post('/register', UserController.save);
router.post('/login', UserController.login);
router.put('/update', md_auth.authenticated, UserController.update)
router.get('/users', UserController.getUsers)
router.get('/user/:userId', UserController.getUser)

module.exports = router;