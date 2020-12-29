const notFound = (req, res, next) => {
	const error = new Error(`Not found - ${req.originalUrl}`);
	res.status(404);
	next(error);
};

const errorHandler = (err, req, res, next) => {
	let statusCode = res.statusCode === 200 ? 500 : res.statusCode;
	if (err.code === 11000 && err.keyValue.email) {
		statusCode = 400;
		res.status(statusCode);
		return res.json({
			message: "User Already exists",
			stack: process.env.NODE_ENV === "production" ? null : err.stack,
		});
	}

	res.status(statusCode);
	res.json({
		message: err.message,
		stack: process.env.NODE_ENV === "production" ? null : err.stack,
	});
};

module.exports = {
	errorHandler,
	notFound,
};
