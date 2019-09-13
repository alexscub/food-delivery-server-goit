const Product = require('../../db/schemas/product')

const productsRoute = (request, response) => {
  response.removeHeader('X-Powered-By');
  const sendResponse = (product) => {
    if (!product) {
      sendError()
    } else {
      response.status(200);
      response.json({
        status: 'success',
        product
      });
    }
  };
  const sendError = () => {
    response.status(404);
    response.json({
      status: 'not found'
    });
  };
  const findProduct = Product.find();

  findProduct
    .then(sendResponse)
    .catch(err => {
      console.log(err.message);
      sendError();
    });
};

module.exports = productsRoute;