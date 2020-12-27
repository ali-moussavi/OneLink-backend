const express = require("express");
const bodyParser = require("body-parser");
const db = require("./config/db");
const dotenv = require("dotenv");
const cardRoutes = require("./routes/cardRoutes");
const errorMiddleware = require("./middleware/errorMiddleware");

dotenv.config();

const app = express();
app.use(bodyParser.json());

app.use("/api/cards/", cardRoutes);

app.use(errorMiddleware.notFound);

app.use(errorMiddleware.errorHandler);

const PORT = process.env.PORT || 5000;

db.connectDB()
	.then(() => {
		app.listen(PORT, () => {
			console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
		});
	})
	.catch((err) => {
		console.log(err);
	});
