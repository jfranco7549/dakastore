const express = require('express');

const app = express();

const http = require('http');
const https = require('https');

const server = http.createServer(app);
const fs = require('fs');
var options = {
    key: fs.readFileSync('./ssl/code.key'),
    cert: fs.readFileSync('./ssl/code.crt')
  };
  
  https.createServer(options, app).listen(91);
var compression = require('compression')

const router = express.Router();

 const multer  = require('multer');

 const mongoose = require('mongoose')
const mongouri = 'mongodb://mercadeo:sPv8gOnU9c0hzAN00h3h@localhost:27230/'
 //const mongouri = 'mongodb://sc:Y%3ByzC(Z9f%5ESc%5E%3C58Gx9Jwc0Y0lM5~o@3.23.208.239:27230/?authMechanism=DEFAULT'
// const mongouri = 'mongodb://localhost:27017/dkstore'
 
 // const mongouri = "mongodb+srv://jfranco:musiuito@cluster0.ogvcv9d.mongodb.net/?retryWrites=true&w=majority"
 mongoose.connect(mongouri).then(db => console.log('DB is Conneted')).catch( err => {
     console.log(err)
 })


 app.set('view engine', 'ejs');
app.use(compression())

app.use('/', require('./routes/socket.js'));
app.use('/direccion', require('./routes/direccion.js'));
app.use('/producto', require('./routes/producto.js'));
app.use('/postventa', require('./routes/tc.js'));


app.use(express.static( __dirname+'/public' ))
//app.use('/socket', require('./routes/socket'));
let port = 81
server.listen(port, () => {
 console.log('listening on *:'+port);
});


