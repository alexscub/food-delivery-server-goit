const express = require('express');
const multer = require('multer');
const path = require('path');
const mainRoute = require('./main/main');
const signUpRoute = require('./users/sign-up-route');
const allproductsRoute = require('./products/products')
const getProductsById = require('./products/by-id')
const getProductsByCategory = require('./products/by-category')
const getUser = require('./users/get-user-route');
const postOrder = require('./orders/post-order')
const getSaveImageHandlers = require('./save-image-multipart/save-image-multipart');
const TEMPORARY_IMAGE_FOLDER = path.join(__dirname, '../', 'assets')
const upload = multer({
  dest: TEMPORARY_IMAGE_FOLDER
})

const apiRoutes = express.Router();

apiRoutes
  .get('/', mainRoute)
  .get('/users/:userId', (request, response) => {
    getUser(request, response)
  })
  .post('/users', signUpRoute)
  .post('/image', upload.single('image'), getSaveImageHandlers)
  .get('/products', (request, response) => {
    if (request.query.ids) {
      getProductsById(request, response, request.query.ids.split(','))
    } else
    if (request.query.category) {
      getProductsByCategory(request, response)
    } else
    if (request.url === '/products') {
      allproductsRoute(request, response)
    }
  })
  .get('/products/:id', (request, response) => {
    getProductsById(request, response, [request.params.id])
  })
  .post('/orders', postOrder)
  .get('*', (req, res, next) => {
    res.status(404).send('Route not exists');
  });

module.exports = apiRoutes;