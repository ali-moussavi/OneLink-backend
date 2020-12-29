const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");

const userControllers = require("../controllers/userControllers");

const router = express.Router();

module.exports = router;

//@desc login user
//@route  GET /api/users/login
//@access Public
router.post("/login", userControllers.loginUser);

//@desc register user
//@route  GET /api/users/register
//@access Public
router.post("/register", userControllers.registerUser);

//@desc get user profile info
//@route  GET /api/users/profile
//@access Private
router.route("/profile").get(authMiddleware.protect, userControllers.getUserProfile);
