import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/userModel.js';

const AuthController = {};

// @desc    Auth user & get token
// @route   POST /api/users/login
// @access  Public
AuthController.login = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (!user) {
    return res
      .status(400)
      .json([{ param: 'email', msg: 'Credenciales o correo inválido' }]);
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    return res.status(400).json([
      {
        param: 'password',
        msg: 'Contraseña incorrecta, intente de nuevo',
      },
    ]);
  }

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
  // res.json({
  //   _id: user._id,
  //   name: user.name,
  //   email: user.email,
  //   isAdmin: user.isAdmin,
  //   token: generateToken(user._id),
  // })
};

// @desc    Get user profile
// @route   GET /api/users/profile
// @access  Private
AuthController.current = async (req, res) => {

  const user = await User.findById(req.user._id);

  if (user) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  } else {
    res.status(404);
    throw new Error('User not found');
  }
};

export default AuthController;
