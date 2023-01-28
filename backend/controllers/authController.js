const AuthController = {};
const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

AuthController.current = async (req, res) => {
  try {
    const user = await prisma.users.findFirst({
      where: { id: req.user.id },
      include: {
        enterprises: true,
      },
    });

    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send({ msg: 'Server error', err: err.message });
  }
};

AuthController.login = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json(errors.array());
  }

  const { email, password } = req.body;

  try {
    let user = await prisma.users.findUnique({
      include: {
        enterprises: true,
      },
      where: { email: email },
    });

    if (!user) {
      return res
        .status(400)
        .json([{ param: 'email', msg: 'Credenciales o correo inválido' }]);
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res
        .status(400)
        .json([
          { param: 'password', msg: 'Contraseña incorrecta, intente de nuevo' },
        ]);
    }

    const payload = {
      user: {
        id: user.id,
        names: `${user.names}`,
        last_names: `${user.last_names}`,
        email: user.email,
        enterpriseId: user.enterpriseId,
        enterpriseName: user.enterprises.name_enterprise,
      },
    };

    jwt.sign(
      payload,
      config.get('jwtSecret'),
      { expiresIn: '5 days' },
      (err, token) => {
        if (err) throw err;
        res.json({ token });
      }
    );
  } catch (err) {
    console.error(err.message);
    res.status(500).send({ msg: 'Server error', err: err.message });
  }
};

module.exports = AuthController;
