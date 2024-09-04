const express = require('express');
const config = require('./config.json');
const app = express();
var bodyParser = require('body-parser')
const http = require('http');
const https = require('https');

const server = http.createServer(app);
const fs = require('fs');
var options = {
  key: fs.readFileSync('./ssl/code.key'),
  cert: fs.readFileSync('./ssl/code.crt')
};

https.createServer(options, app).listen(config.port.https);
var compression = require('compression')

const router = express.Router();

const multer = require('multer');

const mongoose = require('mongoose')
const mongouri = config.db //'mongodb://mercadeo:sPv8gOnU9c0hzAN00h3h@localhost:27230/'
//const mongouri = 'mongodb://sc:Y%3ByzC(Z9f%5ESc%5E%3C58Gx9Jwc0Y0lM5~o@3.23.208.239:27230/?authMechanism=DEFAULT'
//const mongouri = 'mongodb://localhost:27017/dkstore'

// const mongouri = "mongodb+srv://jfranco:musiuito@cluster0.ogvcv9d.mongodb.net/?retryWrites=true&w=majority"
mongoose.connect(mongouri).then(db => console.log('DB is Conneted')).catch(err => {
  console.log(err)
})
const session = require('express-session');
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

var cookies = require("cookie-parser");
app.use(cookies());
app.use(session({
  secret: 'your_secret_key', // A secret key used to sign the session ID cookie
  resave: false, // Forces the session to be saved back to the session store
  saveUninitialized: false, // Forces a session that is "uninitialized" to be saved to the store
  cookie: {
    maxAge: 3600000, // Sets the cookie expiration time in milliseconds (1 hour here)
    httpOnly: true, // Reduces client-side script control over the cookie
    secure: true, // Ensures cookies are only sent over HTTPS
  }
}));
app.set('view engine', 'ejs');
app.use(compression())

app.use('/', require('./routes/socket.js'));
app.use('/direccion', require('./routes/direccion.js'));
app.use('/producto', require('./routes/producto.js'));
app.use('/postventa', require('./routes/tc.js'));
app.use('/user', require('./routes/user.js'));
app.use(express.static(__dirname + '/public'))
//app.use('/socket', require('./routes/socket'));
let port = config.port.http
server.listen(port, () => {
  console.log('listening on *:' + port);
});


