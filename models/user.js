
var mongoose = require('mongoose');
const { Schema } = mongoose;

var UserSchema = Schema({
    name: String,
    lastname: String,
    email: String,
    password: String,
    image: String,
    role: String,
    phone: String,
    temp: Object,
    token: String,
    date: { type: Date, default: Date.now },
})

UserSchema.methods.toJSON = function () {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
    
}
module.exports = mongoose.model('user',UserSchema,'user');
// lowercase y pluralizar el nombre
// user -> documentos(schema)