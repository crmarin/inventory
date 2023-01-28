const express = require("express");
const router = express.Router();
const usersController = require("../../controllers/usersController");

/**
 * @route	GET api/users/lists
 * @desc	Get all users
 * @access	Private
 */
router.get("/list", usersController.list);

/**
 * @route	GET api/users/test
 * @desc	Test users route
 * @access	Public
 */
router.get("/test", (req, res) => res.json({ msg: "Users Works" }));

/**
 * @route   POST api/users/
 * @desc    Register user
 * @access  Public
 */
router.post("/", usersController.register);

/**
 * @route   POST api/users/
 * @desc    Register user
 * @access  Public
 */
router.post("/update", usersController.update);

/**
 * @route	GET api/users/roles
 * @desc	Get all roles users
 * @access	Private
 */
router.get("/roles", usersController.roles);

module.exports = router;
