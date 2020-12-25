const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const app = express();
app.use(bodyParser.json());

app.get("/api/:cardUrlId", (req, res) => {
	const urlId = req.params.cardUlrId;
});

let pass = encodeURIComponent("JWzWGUw38qz2b5A");

mongoose
	.connect(
		`mongodb+srv://smapro:${pass}@cluster0.9df98.mongodb.net/<dbname>?retryWrites=true&w=majority`
	)
	.then(() => {
		app.listen(8080, () => {
			console.log("Server running on port 8080");
		});
	})
	.catch((err) => {
		console.log(err);
	});
