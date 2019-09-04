const User = require('../../db/schemas/user')

const updateUser = (request, response) => {
    const user = request.body;
    const id = request.params.userId;

    const sendError = () => {
        response.status(400);
        response.json({
            status: 'not found'
        });
    };

    const sendResponse = (newUser) => {
        if (!newUser) {
            return sendError();
        }

        response.json({
            status: 'success',
            user: newUser
        });
    };

    User
        .findOneAndUpdate({
                _id: id
            },
            user, {
                new: true,
                useFindAndModify: false
            },
        )
        .then(sendResponse)
        .catch(err => {
            console.log(err.message);
            sendError();
        })

};

module.exports = updateUser;