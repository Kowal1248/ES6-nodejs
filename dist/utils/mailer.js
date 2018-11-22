'use strict';

var _config = require('../config.js');

var _config2 = _interopRequireDefault(_config);

var _nodemailer = require('nodemailer');

var _nodemailer2 = _interopRequireDefault(_nodemailer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function Mailer() {

  Mailer.prototype.send = function (email, text, title) {
    _nodemailer2.default.createTestAccount(function (err, account) {

      var transporter = _nodemailer2.default.createTransport(_config2.default.mail);
      var mailOptions = {
        from: _config2.default.mail.from,
        to: email,
        subject: title,
        text: text,
        html: text
      };

      var tr = transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          return { send: false, message: error };
        } else {
          return { send: true };
        }
      });

      return tr;
    });
  };
}
module.exports = Mailer;