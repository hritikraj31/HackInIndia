const mongoose = require('mongoose'),
	passportlocalmongoose = require('passport-local-mongoose');
const user = mongoose.Schema({
	username: String,
	password: String
});

user.plugin(passportlocalmongoose);
module.exports = mongoose.model('User', user);
