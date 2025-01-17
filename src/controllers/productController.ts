import { Request, Response } from 'express';
import ProductService from '../services/ProductService';

class ProductController {
    static async getProducts(req: Request, res: Response) {
        try {
            const products = await ProductService.getAllProducts();
            res.status(200).json(products);
        } catch (error) {
            res.status(500).json({ message: 'Erreur serveur', error: error.message });
        }
    }
}

export default ProductController;