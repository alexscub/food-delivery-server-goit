const mainRoute = require('./main/main');
const productsRoute = require('./products/products');
const signUpRoute = require('./users/sign-up-route');

const router = {
  '/signup': signUpRoute,
  '/products': productsRoute,
  default: mainRoute
};

module.exports = router;
