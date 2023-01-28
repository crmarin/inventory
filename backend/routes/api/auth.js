const express = require("express");
const router = express.Router();
const authController = require("../../controllers/authController");

/**
 * @route	GET api/auth/test
 * @desc	Test auth route
 * @access	Public
 */
router.get("/test", (req, res) => res.json({ msg: "Auth Works" }));

/**
 * @route	GET api/auth/
 * @desc	Get user by token
 * @access	Private
 */
router.get("/", authController.current);

/**
 * @route   POST api/auth/login
 * @desc    Authenticate user & get token
 * @access  Public
 */
router.post("/login", authController.login);

module.exports = router;
