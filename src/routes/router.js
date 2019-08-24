const mainRoute = require('./main/main').default;
//const productsRoute = require('./products/products');
const signUpRoute = require('./users/sign-up-route');
const handleProductsRoute = require('./products/handle-products-route');

const router = {
  'signup': signUpRoute,
  'products': handleProductsRoute,
  default: mainRoute
};

module.exports = router;
