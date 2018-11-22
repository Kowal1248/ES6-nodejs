'use strict';

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _usersModel = require('../models/users-model.js');

var _usersModel2 = _interopRequireDefault(_usersModel);

var _generatePassword = require('generate-password');

var _generatePassword2 = _interopRequireDefault(_generatePassword);

var _bcrypt = require('bcrypt');

var _bcrypt2 = _interopRequireDefault(_bcrypt);

var _jwtSimple = require('jwt-simple');

var _jwtSimple2 = _interopRequireDefault(_jwtSimple);

var _config = require('../config.js');

var _config2 = _interopRequireDefault(_config);

var _emailValidator = require('email-validator');

var _emailValidator2 = _interopRequireDefault(_emailValidator);

var _mailer = require('../utils/mailer');

var _mailer2 = _interopRequireDefault(_mailer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var mailer = new _mailer2.default();

var Users = _mongoose2.default.model('users');

exports.decode_user = function (req, res) {
  var token = req.headers['x-auth'];
  var auth = _jwtSimple2.default.decode(token, _config2.default.server.secretKey);
  return Users.findOne({
    email: auth.email
  });
};

exports.add_user = function (req, res, next) {
  if (_emailValidator2.default.validate(req.body.email)) {

    var user = new Users(req.body);

    var password = _generatePassword2.default.generate({
      length: 10,
      numbers: true
    });

    _bcrypt2.default.hash(password, 10, function (err, hash) {
      user.password = hash;
      user.save(function (err) {
        if (err) {
          res.sendStatus(412);
        } else {

          mailer.send(user.email, "Twoje hasło w systemie to: " + password, "Utworzono konto w systemie !");
          res.sendStatus(201);
        }
      });
    });
  } else {
    res.sendStatus(400);
  }
};

exports.session_user = function (req, res, next) {
  Users.findOne({
    email: req.body.email
  }).select('password email firstName lastName').exec(function (err, user) {
    if (err) {
      return next(err);
    }
    if (!user) {

      return res.sendStatus(401);
    }
    _bcrypt2.default.compare(req.body.password, user.password, function (err, valid) {
      if (err) {
        return next(err);
      }
      if (!valid) {
        return res.sendStatus(401);
      }
      var token = _jwtSimple2.default.encode({
        id: user._id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        typeAccount: user.type
      }, _config2.default.server.secretKey);
      res.json({ token: token });
    });
  });
};

exports.get_users = function (req, res) {
  Users.find({}, function (err, task6) {
    if (err) res.send(err);
    res.json(task6);
  });
};

exports.delete_user = function (req, res) {
  Users.remove({
    _id: req.params.id
  }, function (err, task3) {
    if (err) res.send(err);
    res.json({
      message: 'user delete'
    });
  });
};