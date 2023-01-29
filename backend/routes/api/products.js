import express from 'express';
const router = express.Router();
import productController from '../../controllers/productController.js';

/**
 * @route	GET api/products
 * @desc	Get all products
 * @access	Public
 */
router.get('/', productController.getProducts);

/**
 * @route	GET api/product/:id
 * @desc	Get a product by id
 * @access	Public
 */
router.get('/:id', productController.getProductById);

export default router;
