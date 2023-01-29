import Product from '../models/productModel.js';
const ProductController = {};

// @desc    Fetch all products
// @route   GET /api/products
// @access  Public
ProductController.getProducts = async (req, res) => {
  const products = await Product.find();

  res.json({ products });
};

// @desc    Fetch single product
// @route   GET /api/products/:id
// @access  Public
ProductController.getProductById = async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (product) {
    res.json(product);
  } else {
    res.status(404).json('Product not found');
  }
};

export default ProductController;
