"use strict";

module.exports = {
  "server": {
    "port": 3000,
    "secretKey": "dupa"
  },
  "db": {
    "protocol": "mongodb",
    "user": "",
    "password": "",
    "url": "127.0.0.1",
    "port": "27017",
    "name": "estudies",
    "options": {
      "useCreateIndex": true,
      "useNewUrlParser": true
    }
  },
  "mail": {
    "pool": true,
    "host": "ssl0.ovh.net",
    "port": "465",
    "secure": true,
    "greetingTimeout": 2000,
    "maxConnections": 1,
    "maxMessages": 20,
    "rateDelta": 5000,
    "rateLimit": 1,
    "auth": {
      "user": "info@estudies.io",
      "pass": "bxA3THpivHbSrEE"
    },
    "from": "eStudies.io <info@estudies.io>"
  }
};