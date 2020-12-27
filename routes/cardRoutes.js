const express = require("express");
const Card = require("../models/card");
const asyncHandler = require("express-async-handler");

const router = express.Router();

module.exports = router;

//@desc fetch a card base on urlId
//@route  GET /api/cards/:cardUrlId
//@access Public
router.get(
	"/:cardUrlId",
	asyncHandler(async (req, res) => {
		const card = await Card.findOneAndUpdate(
			{ urlId: req.params.cardUrlId },
			{ $inc: { views: 1 } }
		);
		if (card) {
			res.json(card);
		} else {
			res.status(404);
			throw new Error("Card not found");
		}
	})
);

//@desc fetch a card base on cardId
//@route  GET /api/cards/cardbyid/:cardId
//@access Public
router.get(
	"/cardbyid/:cardId",
	asyncHandler(async (req, res) => {
		const card = await Card.findById(req.params.cardId);
		if (card) {
			res.json(card);
		} else {
			res.status(404);
			throw new Error("Card not found");
		}
	})
);
