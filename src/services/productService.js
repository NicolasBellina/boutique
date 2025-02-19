import getAllProducts from '../methods/methodsProduct/getAllProducts.js';
import getProductById from '../methods/methodsProduct/getProductById.js';
import createProduct from '../methods/methodsProduct/createProduct.js';
import updateProduct from '../methods/methodsProduct/updateProduct.js';
import deleteProduct from '../methods/methodsProduct/deleteProduct.js';

const productService = {
    getAll: getAllProducts,
    getById: getProductById,
    create: createProduct,
    update: updateProduct,
    delete: deleteProduct,
};

export default productService; 