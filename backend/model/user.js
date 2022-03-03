var mongoose = require('mongoose');
var Schema = mongoose.Schema;

userSchema = new Schema( {
	username: String,
	password: String,
	email: String
}),
user = mongoose.model('user', userSchema);

module.exports = user;