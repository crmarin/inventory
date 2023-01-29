import Order from '../models/orderModel.js';

const OrderController = {};

// @desc    Create new order
// @route   POST /api/orders
// @access  Private
OrderController.addOrder = async (req, res) => {
  const { cart, itemsPrice, totalPrice } = req.body;

  if (cart && cart.length === 0) {
    res.status(400);
    throw new Error('No order items');
    return;
  } else {
    const order = new Order({
      user: req.user._id,
      cart: JSON.parse(cart),
      totalPrice,
      itemsPrice,
      paitAt: Date.now(),
    });

    const createdOrder = await order.save();

    res.status(201).json(createdOrder);
  }
};

// @desc    Get all orders
// @route   GET /api/orders
// @access  Private/Admin
OrderController.getOrders = async (req, res) => {
  const orders = await Order.find();
  res.json(orders);
};

export default OrderController;
