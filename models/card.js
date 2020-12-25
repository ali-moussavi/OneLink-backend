const mongoose = require("mongoose");

const linkSchema = new mongoose.Schema({
	name: { type: String, required: true },
	url: { type: String, required: true },
});

const cardSchema = new mongoose.Schema({
	owner: {
		type: mongoose.Schema.Types.ObjectId,
		required: true,
		ref: "User",
	},
	urlId: { type: String, required: true, unique: true },
	name: { type: String, required: true },
	title: { type: String, required: true },
	views: Number,
	location: String,
	picture: String,
	whatsApp: Number,
	contactNumber: Number,
	instagram: String,
	twitter: String,
	youtube: String,
	relatedLinks: [linkSchema],
	description: String,
	email: String,
});

module.exports = mongoose.model("Card", cardSchema);
