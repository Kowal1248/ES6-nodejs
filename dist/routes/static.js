'use strict';

var _usersController = require('../controllers/users-controller');

var _usersController2 = _interopRequireDefault(_usersController);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = function (app, express, router, path) {

  app.route('/').get(function (req, res) {
    res.json({
      'status': "worked"
    });
  });

  app.route('/users').get(_usersController2.default.get_users).post(_usersController2.default.add_user).delete(_usersController2.default.delete_user);

  app.route('/users/:id').delete(_usersController2.default.delete_user);

  app.route('/session').post(_usersController2.default.session_user);
};