const fs = require('fs');
const path = require('path');
const filePath = path.join(__dirname, '../../', 'db', 'products', 'all-products.json');

const productsRoute = (request, response, index) => {
    fs.readFile(filePath, (err, data) => {
            if (err) throw err;
            const allProducts = JSON.parse(data.toString());
            const res = index.reduce((acc, ci) => {
                const filtered = allProducts.find(obj => obj.id === +ci)
                if (filtered) {
                    acc = [...acc, filtered];
                }
                return acc;
            }, []);
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
        }

    )
};

module.exports = productsRoute;