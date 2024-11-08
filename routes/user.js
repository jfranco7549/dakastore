'use strict'

var express = require('express');
var UserController = require('../controllers/user');
var md_auth = require('../middleware/authenticated');
const OneSignal = require('@onesignal/node-onesignal');
const enviroment = require('../enviroments/enviroment.ts')
var router = express.Router();

router.get('/probando', UserController.probando);
router.get('/testeando', async function (req, res) {

    const configuration = OneSignal.createConfiguration({
        userAuthKey: '05a50a7f-3fa2-463c-9207-f70cd089ef7c',
        restApiKey: 'Y2Q0NTkxNWUtMGQ5NS00MDFhLTk5ZTEtMWE0OWUzODdkOTFm',
    });

    const client = new OneSignal.DefaultApi(configuration);
    try {

        const notification = new OneSignal.Notification();
        notification.app_id = '05a50a7f-3fa2-463c-9207-f70cd089ef7c';
        notification.name = "Nuevo ticket creado";
        notification.contents = {
            en: "Nuevo ticket de ST"
        }

        // required for Huawei
        notification.headings = {
            en: "Nuevo ticket de ST"
        }

        notification.included_segments = ['All']
        notification.filters = [
            {
              field: 'tag',
              key: 'type',
              relation: '=',
              value: 'user'
            },
          ]
        const notificationResponse = await client.createNotification(notification);
        const response = await client.createNotification(notification);
        console.log(response , notificationResponse);

        res.status(200).json('success')
    } catch (e) {
        console.log('e', e)
        res.status(500).json(e)
    }
},
);


//Rutas usuarios
router.post('/register', UserController.save);
router.post('/login', UserController.login);
router.put('/update', md_auth.authenticated, UserController.update)
router.get('/users', UserController.getUsers)
router.get('/user/:userId', UserController.getUser)

module.exports = router;