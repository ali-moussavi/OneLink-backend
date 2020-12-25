const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
	email: { type: String, required: true },
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

module.exports = mongoose.model("User", cardSchema);
