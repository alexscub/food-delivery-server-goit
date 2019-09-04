const User = require('../../db/schemas/user');

const getUser = (request, response) => {

    const id = request.params.userId;
    response.removeHeader('X-Powered-By');
    const sendResponse = (user) => {
        response.status(200);
        response.json({
            status: 'success',
            user
        });
    };
    const sendError = () => {
        response.status(404);
        response.json({
            status: 'not found'
        });
    };
    const findUser = User.findById(id);

    findUser
        .then(sendResponse)
        .catch(err => {
            console.log(err.message);
            sendError();
        });
};

module.exports = getUser;