const express = require('express');
const multer = require('multer');
const path = require('path');
const mainRoute = require('./main/main');
const signUpRoute = require('./users/sign-up-route');
const allproductsRoute = require('./products/products')
const getProductById = require('./products/by-id')
const getProductsByIds = require('./products/by-ids')
const getProductsByCategory = require('./products/by-category')
const createProduct = require('./products/create-product')
const updateProduct = require('./products/update-product')
const getUser = require('./users/get-user-route');
const updateUser = require('./users/update-user')
const postOrder = require('./orders/post-order')
const getOrder = require('./orders/get-order')
const getSaveImageHandlers = require('./save-image-multipart/save-image-multipart');
const TEMPORARY_IMAGE_FOLDER = path.join(__dirname, '../', 'assets')
const upload = multer({
  dest: TEMPORARY_IMAGE_FOLDER
})

const apiRoutes = express.Router();

apiRoutes
  .get('/', mainRoute)
  .get('/users/:userId', getUser)
  .put('/users/:userId', updateUser)
  .post('/users', signUpRoute)
  .post('/image', upload.single('image'), getSaveImageHandlers)
  .get('/products', (request, response) => {
    if (request.query.ids) {
      getProductsByIds(request, response)
    } else
    if (request.query.category) {
      getProductsByCategory(request, response)
    } else
    if (request.url === '/products') {
      allproductsRoute(request, response)
    }
  })
  .get('/products/:id', getProductById)
  .post('/products', createProduct)
  .put('/products/:id', updateProduct)
  .post('/orders', postOrder)
  .get('/orders/:orderId', getOrder)
  .get('*', (req, res, next) => {
    res.status(404).send('Route not exists');
  });

module.exports = apiRoutes;