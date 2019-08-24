const fs = require('fs');
const path = require('path');
const filePath = path.join(__dirname, '../../', 'db', 'products', 'all-products.json');
// const allProducts = JSON.parse(fs.readFileSync(filePath).toString());

const productsRoute = (request, response, category) => {
    fs.readFile(filePath, (err, data) => {
        if (err) throw err;
        const allProducts = JSON.parse(data.toString());
        const res = allProducts.filter(prod => prod.categories.includes(category))
        const resp = {};
        resp.status = 'succes';
        resp.products = res;
        response.writeHead(200, {
            "Content-Type": "application/json"
        });
        response.write(JSON.stringify(
            resp
        ));
        response.end();
    })
};

module.exports = productsRoute;