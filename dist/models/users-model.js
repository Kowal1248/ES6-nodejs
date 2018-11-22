"use strict";

var _mongoose = require("mongoose");

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Schema = _mongoose2.default.Schema;

var usersSchema = new Schema({
  _create: { type: Date, default: Date.now }, //date create account
  _update: Date, //last update date

  //auth data
  email: { type: String, unique: true }, //login
  password: String, //bcrypt
  company: String, //id from company

  firstName: String, //only information data
  secondName: String, //only information data
  lastName: String, //only information data

  address: [{
    primary: Boolean,
    sendLetter: Boolean,
    country: String,
    city: String,
    street: String,
    numberHouse: String,
    numberRoom: String
  }],

  contact: [{
    type: String, // phone,fax,email,
    value: String, //  d.k199@interia.pl other...
    description: String // phone number, office number
  }],

  typeAccount: {
    education: String, //students, teacher, director, administrator
    learning: String //students, teacher, administrator
  },

  avatar: String //id to gridfs

});

module.exports = _mongoose2.default.model('users', usersSchema);