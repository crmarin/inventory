import User from '../models/userModel.js';
import jwt from 'jsonwebtoken';

const UserController = {};

// @desc    Register a new user
// @route   POST /api/users
// @access  Public
UserController.register = async (req, res) => {
  const { name, email, password } = req.body;

  const userExists = await User.findOne({ email });

  if (userExists) {
    return res.status(400).json([{ msg: 'Usuario ya existe', param: 'email' }]);
  }

  const user = await User.create({
    name,
    email,
    password,
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
    // res.status(201).json({
    //   _id: user._id,
    //   name: user.name,
    //   email: user.email,
    //   isAdmin: user.isAdmin,
    //   token: generateToken(user._id),
    // })
  } else {
    return res.status(400).json([{ msg: 'Invalid user data', param: 'email' }]);
  }
};

export default UserController;
