const fs = require('fs');
const path = require('path');
const filePath = path.join(__dirname, '../../', 'db', 'products', 'all-products.json');

const productsRoute = (request, response, idArr) => {
    fs.readFile(filePath, (err, data) => {
        if (err) throw err;
        const allProducts = JSON.parse(data.toString());
        const res = idArr.reduce((acc, ci) => {
            const filtered = allProducts.find(obj => obj.id === +ci)
            if (filtered) {
                acc = [...acc, filtered];
            }
            return acc;
        }, []);
        response.status(200)
        response.removeHeader('X-Powered-By')
        if (!res.length) {
            response.json({
                status: 'no products',
                products: res
            });
        } else {
            response.json({
                status: 'succes',
                products: res
            });
        }
        response.end();
    })
};

module.exports = productsRoute;