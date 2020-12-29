const mongoose = require("mongoose");
const dotenv = require("dotenv");
const db = require("./config/db");
const User = require("./models/user");
const Card = require("./models/card");
const users = require("./data/users");
const cards = require("./data/cards");
const bcrypt = require("bcryptjs");

dotenv.config();

const addUsersandCard = async () => {
	try {
		console.log(users);
		const createdUser = new User({
			email: "j.smith@gmail.com",
			password: bcrypt.hashSync("123456", 10),
			cards: [],
		});
		const addedUser = await createdUser.save();
		const userID = addedUser._id;

		const createdCard = new Card({
			owner: userID,
			urlId: "jsmith",
			name: "John Smith",
			title: "Web Developer",
			views: 0,
			location: "https://goo.gl/maps/BNo9pArvVHbvNGYq5",
			picture: "https://randomuser.me/api/portraits/men/18.jpg",
			whatsApp: "16476751234",
			telegramId: "M_Ali73",
			contactNumber: "6476751234",
			instagram: "https://www.instagram.com/mohammadali73/",
			twitter: "https://twitter.com/",
			relatedLinks: [
				{
					name: "My Website",
					url: "https://www.alimoussavi.dev/",
				},
			],
			description: "I am a web developer specialized in the mern stack",
			email: "j.smith@gmail.com",
			locationAddress: "19 Yonge Street, Toronto",
			locationLink: "https://goo.gl/maps/aMTBbUqwbd2wzZL67",
			linkedIn: "https://www.linkedin.com/in/ali-moussavi/",
		});
		await createdCard.save();
		console.log("data added to database");
		process.exit();
	} catch (error) {
		console.log(error);
		process.exit(1);
	}
};

db.connectDB()
	.then(() => {
		addUsersandCard();
	})
	.catch((err) => {
		console.log(err);
	});
