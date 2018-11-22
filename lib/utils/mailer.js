import cnf from '../config.js'
import nodemailer from 'nodemailer'

function Mailer() {

  Mailer.prototype.send = function(email, text, title) {
    nodemailer.createTestAccount((err, account) => {

      let transporter = nodemailer.createTransport(cnf.mail);
      let mailOptions = {
        from: cnf.mail.from,
        to: email,
        subject: title,
        text: text,
        html: text
      };

      var tr = transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          return {send: false, message: error};
        } else {
          return {send: true}
        }
      });

      return tr
    });
  }
}
module.exports = Mailer;
