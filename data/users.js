const bcrypt = require("bcryptjs");

const users = [
	{
		email: "j.smith@gmail.com",
		password: bcrypt.hashSync("test123", 10),
		cards: [],
	},

	{
		email: "jane.doe@gmail.com",
		password: bcrypt.hashSync("test123", 10),
		cards: [],
	},
];

module.exports.users = users;
