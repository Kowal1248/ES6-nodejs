import mongoose from "mongoose";

var Schema = mongoose.Schema;

var usersSchema = new Schema({
  _update: {type: Date, default:Date.now}, //last update date

  //auth data
  email: {type: String, unique: true}, //login
  password: String, //bcrypt
  company: String, //id from company

  firstName: String, //only information data
  secondName: String, //only information data
  lastName: String, //only information data


});


module.exports = mongoose.model('users', usersSchema);
