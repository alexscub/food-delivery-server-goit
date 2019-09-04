const Order = require('./../../db/schemas/order')

const getOrder = (request, response) => {
    const id = request.params.orderId;
    response.removeHeader('X-Powered-By');
    const sendResponse = (order) => {
        if (!order) {
            sendError()
        } else {
            response.status(200);
            response.json({
                status: 'success',
                order
            });
        }
    };
    const sendError = () => {
        response.status(404);
        response.json({
            status: 'not found'
        });
    };
    const findOrder = Order.findById(id);

    findOrder
        .then(sendResponse)
        .catch(err => {
            console.log(err.message);
            sendError();
        });
};

module.exports = getOrder;