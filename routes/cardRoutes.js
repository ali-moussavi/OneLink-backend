const express = require("express");
const cardControllers = require("../controllers/cardControllers");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

module.exports = router;

//@desc fetch a card base on urlId
//@route  GET /api/cards/:cardUrlId
//@access Public
router.get("/:cardUrlId", cardControllers.getCardByUrlId);

//@desc fetch a card base on cardId
//@route  GET /api/cards/cardbyid/:cardId
//@access Public
router.route("/cardbyid/:cardid").get(cardControllers.getCardById);

//@desc edit a card base on cardId
//@route  put /api/cards/edit/:cardId
//@access Private
router.route("/edit/:cardid").put(authMiddleware.protect, cardControllers.editCard);

//@desc create a new card
//@route  put /api/cards/new
//@access Private
router.route("/new").post(authMiddleware.protect, cardControllers.createNewCard);

//@desc delete card
//@route  put /api/cards/delete.:cardid
//@access Private
router
	.route("/delete/:cardid")
	.delete(authMiddleware.protect, cardControllers.deleteCard);
