const mongoose = require("mongoose");
const { users } = require("../data/users");

const userSchema = new mongoose.Schema({
	email: {
		type: String,
		required: "Please enter an email",
		unique: "This email already exists in our database",
	},
	password: { type: String, required: true },
	cards: [
		{
			urlId: { type: String, required: true },
			name: { type: String, required: true },
			picture: String,
			cardId: { type: mongoose.Schema.Types.ObjectId, required: true },
		},
	],
});

module.exports = mongoose.model("User", userSchema);
