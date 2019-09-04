const Order = require('./../../db/schemas/order')

const postOrder = (request, response) => {
    let body = '';
    request.on('data', function (data) {
        body = body + data;
    });
    request.on('end', function () {
        const orderData = JSON.parse(body);

        const newOrder = new Order(orderData);
        response.removeHeader('X-Powered-By');

        const sendResponse = (order) => {
            response.status(201);
            response.json({
                status: 'success',
                order
            });
        };

        const sendError = (err) => {
            response.status(400);
            response.json({
                error: 'can not create order',
                message: err.message
            });
        };
        newOrder.save()
            .then(sendResponse)
            .catch(err => {
                console.log(err);
                sendError(err)
            })
    })
}

module.exports = postOrder;