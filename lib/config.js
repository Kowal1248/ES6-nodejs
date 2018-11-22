module.exports = {
  "server": {
    "port": 3000,
    "secretKey": "addKey"
  },
  "db": {
    "protocol": "mongodb",
    "user": "",
    "password": "",
    "url": "127.0.0.1",
    "port": "27017",
    "name": "startProject",
    "options": {
      "useCreateIndex": true,
      "useNewUrlParser": true
    }
  },
  "mail": {
    "pool": true,
    "host": "#",
    "port": "465",
    "secure": true,
    "greetingTimeout": 2000,
    "maxConnections": 1,
    "maxMessages": 20,
    "rateDelta": 5000,
    "rateLimit": 1,
    "auth": {
      "user": "#",
      "pass": "#"
    },
    "from": "test <test@test.io>"
  }
}
