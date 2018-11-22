'use strict';

var _cliTable = require('cli-table');

var _cliTable2 = _interopRequireDefault(_cliTable);

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _http = require('http');

var _http2 = _interopRequireDefault(_http);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _static = require('./routes/static');

var _static2 = _interopRequireDefault(_static);

var _config = require('./config.js');

var _config2 = _interopRequireDefault(_config);

var _package = require('../package.json');

var _package2 = _interopRequireDefault(_package);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var getConnectData = function getConnectData(data, tmp) {
  if (data.user != "" || data.password != "") {
    tmp = data.protocol + "://" + data.user + ":" + data.password + "@" + data.url + ":" + data.port + "/" + data.name;
  } else {
    tmp = data.protocol + "://" + data.url + ":" + data.port + "/" + data.name;
  }
  return tmp;
};

//init


//config data
//load plugin
var app = (0, _express2.default)();
var port = process.env.PORT || _config2.default.server.port;
var db = {
  url: getConnectData(_config2.default.db),
  options: _config2.default.db.options
};
var databaseConnected = false;

//connect db
_mongoose2.default.Promise = global.Promise;
_mongoose2.default.connect(db.url, db.options, function (err) {
  if (err) {
    databaseConnected = false;
  } else {
    databaseConnected = true;
  }
});

//middleware
app.use(_bodyParser2.default.urlencoded({
  extended: true
}));
app.use(_bodyParser2.default.json());

//load router
(0, _static2.default)(app, _express2.default, _express2.default.Router(), _path2.default);

//404 page
app.use(function (req, res) {
  res.status(404).send({
    url: req.originalUrl + ' not found'
  });
});

app.listen(port);

//log

var table = new _cliTable2.default({ head: ["Name", "Set"] });

table.push({ 'project': [_package2.default.name] }, { 'author': [_package2.default.author] }, { 'version': [_package2.default.version] }, { 'port': [port] }, { 'connected': [databaseConnected] }, { 'monoose': [_mongoose2.default.version] }, { 'nodejs': [process.version] });
console.log(table.toString());
console.log("To restart server write 'rs'...");