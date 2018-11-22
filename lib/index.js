//load plugin
import Table from 'cli-table'
import express from 'express'
import http from 'http'
import path from 'path'
import bodyParser from 'body-parser'
import fs from 'fs'
import mongoose from 'mongoose'
import routes from './routes/static'

//config data
import config from './config.js'
var getConnectData = (data, tmp) => {
  if (data.user != "" || data.password != "") {
    tmp = data.protocol + "://" + data.user + ":" + data.password + "@" + data.url + ":" + data.port + "/" + data.name
  } else {
    tmp = data.protocol + "://" + data.url + ":" + data.port + "/" + data.name
  }
  return tmp
}

//init
var app = express()
var port = process.env.PORT || config.server.port
var db = {
  url: getConnectData(config.db),
  options: config.db.options
}
let databaseConnected = false

//connect db
mongoose.Promise = global.Promise;
mongoose.connect(db.url, db.options, (err) => {
  if (err){
    databaseConnected = false
  } else {
    databaseConnected = true
  }
})

//middleware
import cors from 'cors'
import auth from './middleware/auth'

app.use(cors())
//start when auth is done - > app.use(auth)
app.use(bodyParser.urlencoded({
  limit: '50mb',
  extended: true
}));
app.use(bodyParser.json({limit: '50mb'}));


//load router
routes(app, express, express.Router(), path);

//404 page
app.use((req, res) => {
  res.status(404).send({
    url: req.originalUrl + ' not found'
  })
});

app.listen(port);

//log
import pkg from "../package.json"
const table = new Table({ head: ["Name", "Set"] });

table.push(
  { 'project': [pkg.name]},
  { 'author': [pkg.author]},
  { 'version': [pkg.version]},
  { 'port': [port] },
  { 'connected': [databaseConnected]},
  { 'monoose': [mongoose.version] },
  {'nodejs': [process.version]}
 );
 console.log(table.toString());
 console.log("To restart server write 'rs'...");
