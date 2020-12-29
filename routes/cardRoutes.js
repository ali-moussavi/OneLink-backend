const express = require("express");
const cardControllers = require("../controllers/cardControllers");

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
