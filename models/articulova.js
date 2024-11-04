const mongoose = require('mongoose')
const { Schema } = mongoose;

const articulova = new  Schema({
 sap:String,
 Dcomercial:String,
 Marca:String,
 Familia:String,
 Linea:String,
 Modelo:String
 
})

module.exports = mongoose.model('articulova',articulova,'articulova');