const User = require('../../db/schemas/user')

const signUpRoute = (request, response) => {
  let body = '';
  request.on('data', function (data) {
    body = body + data;
  });
  request.on('end', function () {
    const userData = JSON.parse(body);
    const newUser = new User(userData);
    response.removeHeader('X-Powered-By');
    const sendResponse = (user) => {
      response.status(201);
      response.json({
        status: 'success',
        user
      });
    };

    const sendError = () => {
      response.status(400);
      response.json({
        error: 'user was not saved'
      });
    };
    newUser.save()
      .then(sendResponse)
      .catch(sendError)
  })
}

module.exports = signUpRoute;