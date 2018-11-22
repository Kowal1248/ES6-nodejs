import mongoose from 'mongoose'
import users from "../models/users-model.js"
import generator from 'generate-password'
import bcrypt from 'bcrypt'
import jwt from 'jwt-simple'
import config from '../config.js'
import EmailValidator from 'email-validator';
import Mailer from '../utils/mailer'
var mailer = new Mailer();


var Users = mongoose.model('users');

exports.decode_user = function(req, res) {
  var token = req.headers['x-auth']
  var auth = jwt.decode(token, config.server.secretKey)
  return Users.findOne({
    email: auth.email
  })
}

exports.add_user = function(req, res, next) {
  if (EmailValidator.validate(req.body.email)) {

    var user = new Users(
      req.body
    )

    var password = generator.generate({
      length: 10,
      numbers: true
    });

    bcrypt.hash(password, 10, function(err, hash) {
      user.password = hash
      user.save(function(err) {
        if (err) {
          res.sendStatus(412);
        } else {

          mailer.send(user.email, "Password: " + password, "Created account !");
          res.sendStatus(201);
        }
      })
    })
  } else {
    res.sendStatus(400);
  }
};

exports.session_user = function(req, res, next) {
  Users.findOne({
      email: req.body.email
    })
    .select('password email firstName lastName')
    .exec(function(err, user) {
      if (err) {
        return next(err)
      }
      if (!user) {

        return res.sendStatus(401)
      }
      bcrypt.compare(req.body.password, user.password, function(err, valid) {
        if (err) {
          return next(err)
        }
        if (!valid) {
          return res.sendStatus(401)
        }
        var token = jwt.encode({
          id: user._id,
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
          typeAccount: user.type,
        }, config.server.secretKey)
        res.json({token: token})
      })
    })
}

exports.get_users = function(req, res) {
  Users.find({}, function(err, task6) {
    if (err)
      res.sendStatus(400);
    res.json(task6);
  });
};

exports.delete_user = function(req, res) {
  Users.remove({
    _id: req.params.id
  }, function(err, task3) {
    if (err)
      res.sendStatus(400);
    res.json({
      message: 'user delete'
    });
  });
};
