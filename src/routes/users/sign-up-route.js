const fs = require('fs');
const path = require('path');
const {
  writeFile
} = fs.promises;
const {
  readFile
} = fs.promises;

const saveUser = async (data) => {
  const usersPath = path.join(__dirname, '../../', 'db', 'users', 'all-users.json');
  const readData = await readFile(usersPath);
  let parsedData
  if (readData.length) {
    parsedData = JSON.parse(readData.toString())
  } else {
    parsedData = []
  }
  parsedData.push(data);
  await writeFile(usersPath, JSON.stringify(parsedData, null, 4));
}

const signUpRoute = (request, response) => {
  let body = '';
  request.on('data', function (data) {
    body = body + data;
  });
  request.on('end', function () {
    const user = JSON.parse(body);
    user.id = Date.now();
    saveUser(user);
    response.status(201)
    response.removeHeader('X-Powered-By');
    response.json({
      status: 'succes',
      user: user
    });
    response.end();
  });
};

module.exports = signUpRoute;