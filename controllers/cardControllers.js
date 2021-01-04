const Card = require("../models/card");
const User = require("../models/user");
const asyncHandler = require("express-async-handler");
const { findOneAndUpdate } = require("../models/card");

const getCardByUrlId = asyncHandler(async (req, res) => {
	const card = await Card.findOneAndUpdate(
		{ urlId: req.params.cardUrlId },
		{ $inc: { views: 1 } }
	);
	if (card) {
		// res.status(401);
		// throw new Error("You are not authorized");
		res.json(card);
	} else {
		res.status(404);
		throw new Error("Card not found");
	}
});

const getCardById = asyncHandler(async (req, res) => {
	const card = await Card.findById(req.params.cardid);
	if (card) {
		res.json(card);
	} else {
		res.status(404);
		throw new Error("Card not found");
	}
});

const createNewCard = asyncHandler(async (req, res) => {
	const addedCard = await Card.create({ ...req.body, owner: req.user._id });

	if (addedCard) {
		const cardInfo = {
			cardId: addedCard._id,
		};
		const user = await User.findOneAndUpdate(
			{ _id: req.user._id },
			{ $push: { cards: cardInfo } }
		);

		if (user) {
			res.status(201).json({ addedCard });
		} else {
			res.status(400);
			throw new Error("Could not find user");
		}
	} else {
		res.status(400);
		throw new Error("Invalid card data");
	}
});

const editCard = asyncHandler(async (req, res) => {
	let card = undefined;
	if (String(req.user._id) == String(req.body.owner)) {
		card = await Card.findOneAndReplace({ _id: req.params.cardid }, req.body, {
			new: true,
		});
		if (card) {
			res.json(card);
		} else {
			res.status(404);
			throw new Error("Card not found");
		}
	} else {
		res.status(401);
		throw new Error("You are not authorized");
	}
});

const deleteCard = asyncHandler(async (req, res) => {
	const card = await Card.findById(req.params.cardid);
	if (card) {
		if (String(card.owner) == String(req.user._id)) {
			await Card.deleteOne({ _id: req.params.cardid });
			await User.updateOne(
				{ _id: req.user._id },
				{ $pull: { cards: { cardId: req.params.cardid } } }
			);
			res.json({ message: "Deleted successfuly" });
		} else {
			res.status(401);
			throw new Error("Not Authorized");
		}
	} else {
		res.status(404);
		throw new Error("Card not found");
	}
});

const cardUrlExists = asyncHandler(async (req, res) => {
	await Card.exists({ urlId: req.params.urlid }, function (err, result) {
		if (err) {
			console.log(err);
			res.status(404);
			throw new Error("Could not perform task");
		} else {
			res.json({ result: result });
		}
	});
});

module.exports = {
	getCardById,
	getCardByUrlId,
	editCard,
	deleteCard,
	createNewCard,
	cardUrlExists,
};
