const http = require('http');
const url = require('url');
const router = require('./routes/router');
const express = require('express');
const bodyParser = require('body-parser');

const app = express();

const errorHandler = (err, req, res, next) => {
  res
    .status(500)
    .send('Error found: ' + err.stack);
};

const startServer = port => {
  app
    .use(bodyParser.urlencoded({
      extended: false
    }))
    .use(bodyParser.json())
    .use('/', router)
    .use(errorHandler)

  app.listen(port, () => {
    console.log(`server is listening on ${port}`)
  });
}

module.exports = startServer;