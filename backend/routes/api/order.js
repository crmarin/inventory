import express from 'express';
const router = express.Router();
import orderController from '../../controllers/orderController.js';
import auth from '../../middleware/auth.js';

/**
 * @route	POST api/order/
 * @desc	Add new order
 * @access	Private
 */
router.post('/', auth, orderController.addOrder);

/**
 * @route	GET api/order
 * @desc	Get all orders
 * @access	Private
 */
router.get('/', auth, orderController.getOrders);

export default router;
