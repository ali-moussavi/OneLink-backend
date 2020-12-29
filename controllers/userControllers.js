const User = require("../models/user");
const asyncHandler = require("express-async-handler");
const generateToken = require("../utils/generateWebToken");

//sign in user
const loginUser = asyncHandler(async (req, res) => {
	const { email, password } = req.body;

	const user = await User.findOne({ email });
	if (user && (await user.matchPassword(password))) {
		res.json({
			_id: user._id,
			email: user.email,
			token: generateToken.generateToken(user._id),
		});
	} else {
		res.status(401);
		throw new Error("Invalid email or password");
	}
});

const getUserProfile = asyncHandler(async (req, res) => {
	const user = await User.findById(req.user._id).select("-password");
	if (user) {
		res.json(user);
	} else {
		res.status(404);
		throw new Error("User not found");
	}
});

const registerUser = asyncHandler(async (req, res) => {
	const { email, password } = req.body;

	const addedUser = await User.create({
		email,
		password,
		cards: [],
	});

	if (addedUser) {
		res.status(201).json({
			_id: addedUser._id,
			email: addedUser.email,
			token: generateToken.generateToken(addedUser._id),
		});
	} else {
		res.status(400);
		throw new Error("Invalid user data");
	}
});

module.exports = {
	registerUser,
	loginUser,
	getUserProfile,
};
