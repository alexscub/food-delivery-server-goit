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
  // Взять данные что пришли

  if (request.method === 'POST') {
    let body = '';
    request.on('data', function (data) {
      body = body + data;
    });
    request.on('end', function () {
      const user = JSON.parse(body);
      const username = user.username;
      const resp = {};
      resp.user = user;
      const sendResponse = () => {
        resp.status = 'succes';
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

  }

  // Взять username с данных, сохранить в переменную

  // Сохраняем данные в <username>.json

  // Сохранить <username>.json в папку users

  // Отправляем файл в ответе с данными юзера
  // использовать response
};

module.exports = signUpRoute;