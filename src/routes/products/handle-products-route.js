const url = require('url');
const allproductsRoute = require('./products')
const getProductsById = require('./by-id')
const getProductsByCategory = require('./by-category')

const isIds = myString => /^\?ids=/.test(myString);
const isCategory = myString => /^\?category=/.test(myString);

const handleProductsRoute = (request, response) => {
  const query = request.parsedPath[2];
  if (request.method === 'GET') {
    if (!query) {
      allproductsRoute(request, response)
      return
    }
    if (+query > 0) {
      getProductsById(request, response, [+query])
      return
    };
    if (isIds(query)) {
      const ids = query.split('=')[1].split(',')
      getProductsById(request, response, ids)
      return
    };
    if (isCategory(query)) {
      const category = query.split('=')[1].split(',')[0]
      getProductsByCategory(request, response, category)
      return
    };

    return;
  }

};

module.exports = handleProductsRoute;