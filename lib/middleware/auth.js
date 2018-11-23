import jwt from 'jwt-simple'
import config from '../config.js'
module.exports = function(req, res, next) {
  if (req.headers['x-auth']) {
    try {
      req.auth = jwt.decode(req.headers['x-auth'], config.secret)
      //add search user in db
      //this is simple check
    } catch (err) {
      req.auth = null
    }
  }
  next()

}
