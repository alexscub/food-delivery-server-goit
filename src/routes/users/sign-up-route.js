const qs = require('querystring');
const fs = require('fs');
const path = require('path');
const util = require('util');
const writeFile = util.promisify(fs.writeFile);

const saveUser = (fileName, data) => {
  const usersPath = path.join(__dirname, '../../', 'db', 'users', fileName + '.json');
  return writeFile(usersPath, data);
};

const signUpRoute = (request, response) => {
  if (request.method === 'POST') {
    let body = '';
    request.on('data', function (data) {
      body = body + data;
    });
    request.on('end', function () {
      const user = JSON.parse(body);
      const username = user.username;
      const sendResponse = () => {
        const resp = {};
        resp.status = 'succes';
        resp.user = user;
        response.writeHead(201, {
          "Content-Type": "application/json"
        });
        response.write(JSON.stringify(resp));
        response.end();
      };
      saveUser(username, body)
        .then(sendResponse)
        .catch(er => console.log(er));
    });

  };

};

module.exports = signUpRoute;