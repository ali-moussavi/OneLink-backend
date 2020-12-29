const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

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

userSchema.methods.matchPassword = async function (enteredPassword) {
	return await bcrypt.compare(enteredPassword, this.password);
};

userSchema.pre("save", async function (next) {
	if (!this.isModified("password")) {
		next();
	}
	const salt = await bcrypt.genSalt(10);
	this.password = await bcrypt.hash(this.password, salt);
});
module.exports = mongoose.model("User", userSchema);
