const Card = require("../models/card");
const asyncHandler = require("express-async-handler");

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

module.exports = {
	getCardById,
	getCardByUrlId,
};
