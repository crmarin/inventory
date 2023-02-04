import User from '../models/userModel.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

const UserController = {};

// @desc    Register a new user
// @route   POST /api/users
// @access  Public
UserController.register = async (req, res) => {
  const { name, email, password, isAdmin } = req.body;

  const userExists = await User.findOne({ email });

  if (userExists) {
    return res.status(400).json([{ msg: 'Usuario ya existe', param: 'email' }]);
  }

  const salt = await bcrypt.genSalt(10);
  const hash_password = await bcrypt.hash(password, salt);

  const user = await User.create({
    name,
    email,
    password: hash_password,
    isAdmin: isAdmin,
  });

  if (user) {
    const payload = {
      user: {
        _id: user._id,
      },
    };

    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: '5 days' },
      (err, token) => {
        if (err) throw err;
        res.json({ token });
      }
    );
  } else {
    return res.status(400).json([{ msg: 'Invalid user data', param: 'email' }]);
  }
};

export default UserController;
