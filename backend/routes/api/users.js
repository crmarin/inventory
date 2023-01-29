import express from 'express';
const router = express.Router();
import usersController from '../../controllers/usersController.js';

/**
 * @route	GET api/users/test
 * @desc	Test users route
 * @access	Public
 */
router.get('/test', (req, res) => res.json({ msg: 'Users Works' }));

/**
 * @route   POST api/users/
 * @desc    Register user
 * @access  Public
 */
router.post('/', usersController.register);

export default router;
