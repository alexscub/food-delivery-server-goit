const fs = require('fs');
const path = require('path');
const TEMPORARY_IMAGE_FOLDER = path.join(__dirname, '../../', 'assets');
const PRODUCTS_FOLDER = path.join(__dirname, '../../', 'db', 'products');

const createFolder = (filePath) => {
    if (!fs.existsSync(filePath)) {
        fs.mkdirSync(filePath);
    }
};

const copy = (oldPath, newPath) => {
    const readStream = fs.createReadStream(oldPath);
    const writeStream = fs.createWriteStream(newPath);
    readStream.pipe(writeStream);
}

const moveImage = async (fileObject, id) => {
    const productImageFolderName = 'product-' + id;
    const productFolder = path.join(PRODUCTS_FOLDER, productImageFolderName)
    createFolder(productFolder);
    const TemporaryImageName = path.join(TEMPORARY_IMAGE_FOLDER, fileObject.filename);
    const RegularImageName = path.join(productFolder, fileObject.originalname);
    copy(TemporaryImageName, RegularImageName);
    return (RegularImageName);
};

const saveImageMultipart = async (req, res, next) => {
    const imgPath = await moveImage(req.file, req.body.productId);
    res.status(200)
    res.removeHeader('X-Powered-By');
    res.json({
        status: 'was saved in:' + imgPath,
    });
    res.end();
}

module.exports = saveImageMultipart