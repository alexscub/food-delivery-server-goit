const fs = require('fs');
const path = require('path');
const {
    writeFile
} = fs.promises;
const {
    readFile
} = fs.promises;
const {
    mkdir
} = fs.promises

const productsPath = path.join(__dirname, '../../', 'db', 'products', 'all-products.json')

const avaliableAllProducts = async (ids) => {
    const readData = await readFile(productsPath);
    const parsedData = JSON.parse(readData.toString())
    return ids.every(el => parsedData.find(prod => prod.id === el))
}

const postOrder = (request, response) => {
    let body = '';
    request.on('data', function (data) {
        body = body + data;
    });
    request.on('end', async function () {
        response.removeHeader('X-Powered-By');
        const requestOrder = JSON.parse(body);
        const productsAvailability = await avaliableAllProducts(requestOrder.products);
        if (productsAvailability) {
            const usersPath = path.join(__dirname, '../../', 'db', 'users', requestOrder.user);
            !fs.existsSync(usersPath) ? await mkdir(usersPath) : null;
            const userOrdersPath = path.join(usersPath, 'orders');
            !fs.existsSync(userOrdersPath) ? await mkdir(userOrdersPath) : null;
            const orderId = '' + Date.now();
            const order = Object.assign({
                    id: orderId
                },
                requestOrder
            )
            const writeFilePath = path.join(userOrdersPath, orderId + '.json');
            await writeFile(writeFilePath, JSON.stringify(order, null, 4));
            response.status(201)
            response.json({
                status: 'succes',
                order: order
            });
        } else {
            response.status(200)
            response.json({
                status: 'failed',
                order: null
            });
        }
        response.end();
    })
}

module.exports = postOrder;