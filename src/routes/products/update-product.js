const Product = require('../../db/schemas/product')

const updateProduct = (request, response) => {
    let body = '';
    request.on('data', function (data) {
        body = body + data;
    });
    request.on('end', function () {
        const product = JSON.parse(body);
        const id = request.params.id;
        const sendError = () => {
            response.status(400);
            response.json({
                status: 'not found'
            });
        };

        const sendResponse = (newProduct) => {
            if (!newProduct) {
                return sendError();
            }
            response.json({
                status: 'success',
                product: newProduct
            });
        };

        Product
            .findOneAndUpdate({
                _id: id
            }, {
                ...product,
                modified: Date.now()
            }, {
                new: true,
                useFindAndModify: false
            }, )
            .then(sendResponse)
            .catch(err => {
                console.log(err.message);
                sendError();
            })
    })

};

module.exports = updateProduct;