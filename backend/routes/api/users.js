import express from 'express';
const router = express.Router();
import usersController from '../../controllers/usersController.js';

/**
 * @route   POST api/users/
 * @desc    Register user
 * @access  Public
 */
router.post('/', usersController.register);

export default router;
