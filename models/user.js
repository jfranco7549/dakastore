
var mongoose = require('mongoose');
const { Schema } = mongoose;

var UserSchema = Schema({
    name: String,
    lastname: String,
    email: String,
    password: String,
    image: String,
    role: String,
    date: { type: Date, default: Date.now },
})

UserSchema.methods.toJSON = function () {
    var obj = this.toObject();
    delete obj.password;
    return obj;
}
module.exports = mongoose.model('user',UserSchema,'user');
// lowercase y pluralizar el nombre
// user -> documentos(schema)