const mongoose = require('mongoose')
const { Schema } = mongoose;

const articulo = new  Schema({
 sap:String,
 status:Boolean,
 precio:Number,
 marca:String,
 familia:String,
 promo:Boolean,
 va:{ type: Boolean, default: false },
 categoria:String,
 uv:Number
})

module.exports = mongoose.model('articulo',articulo,'articulo');