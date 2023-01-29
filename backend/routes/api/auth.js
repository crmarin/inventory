import express from 'express';
const router = express.Router();
import authController from '../../controllers/authController.js';
import auth from '../../middleware/auth.js';

/**
 * @route	GET api/auth/test
 * @desc	Test auth route
 * @access	Public
 */
router.get('/test', (req, res) => res.json({ msg: 'Auth Works' }));

// /**
//  * @route	GET api/auth/
//  * @desc	Get user by token
//  * @access	Private
//  */
router.get('/', auth, authController.current);

// /**
//  * @route   POST api/auth/login
//  * @desc    Authenticate user & get token
//  * @access  Public
//  */
router.post('/login', authController.login);

export default router;
