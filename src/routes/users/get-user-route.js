const fs = require('fs');
const path = require('path');
const {
    readFile
} = fs.promises;

const findUser = async (userid) => {
    const usersPath = path.join(__dirname, '../../', 'db', 'users', 'all-users.json');
    const readData = await readFile(usersPath);
    const parsedData = JSON.parse(readData.toString());
    const res = parsedData.find(user => user.id === +userid);
    return res
}

const findUserRoute = async (request, response) => {
    const res = await findUser(request.params.userId)
    response.status(200)
    response.removeHeader('X-Powered-By');
    if (!res) {
        response.json({
            status: 'not found',
        })
    } else {
        response.json({
            status: 'succes',
            user: res
        });
    }
    response.end();
}

module.exports = findUserRoute;