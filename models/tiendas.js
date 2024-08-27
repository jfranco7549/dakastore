const mongoose = require('mongoose')
const { Schema } = mongoose;

const tienda = new  Schema({
    
    cod_Tienda:String,
    nombre:String

 

})

module.exports = mongoose.model('tienda',tienda,'tienda');