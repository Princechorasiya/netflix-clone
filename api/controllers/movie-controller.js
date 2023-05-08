const Movies = require("../models/Movie");

exports.createNewMovie = async (req, res) => {
	if (req.user.isAdmin) {
		const newMovie = new Movies(req.body);
		try {
			const savedMovie = await newMovie.save();
			return res.status(201).json({
				message: "movie added",
				data: savedMovie,
			});
		} catch (err) {
			return res.status(500).json(err);
		}
	} else {
		return req.status(403).json("you're not allowed!");
	}
};

exports.updateMovie = async (req, res) => {
	if (req.user.isAdmin) {
		try {
			const updatedMovie = await Movies.findByIdAndUpdate(
				req.params.id,
				{
					$set: req.body,
				},
				{
					new: true,
				}
			);
			return res.status(201).json({
				message: "movie data",
				data: updatedMovie,
			});
		} catch (err) {
			return res.status(500).json(err);
		}
	} else {
		return req.status(403).json("you're not allowed!");
	}
};

exports.deleteMovie = async (req, res) => {
	if (req.user.isAdmin) {
		try {
			await Movies.findByIdAndDelete(req.params.id);
			return res.status(201).json({
				message: "movie deleted",
			});
		} catch (err) {
			return res.status(500).json(err);
		}
	} else {
		return req.status(403).json("you're not allowed!");
	}
};

exports.getAMovie = async (req, res) => {
	try {
		const movie = await Movies.findById(req.params.id);
		return res.status(200).json({
			message: "movie added",
			data: movie,
		});
	} catch (err) {
		return res.status(500).json(err);
	}
};

exports.getRandomMovie = async (req, res) => {
	const type = req.query.type;
	let movie;
	try {
		if (type === "series") {
			movie = await Movies.aggregate([
				{ $match: { isSeries: true } },
				{ $sample: { size: 1 } },
			]);
		} else {
			movie = await Movies.aggregate([
				{ $match: { isSeries: false } },
				{ $sample: { size: 1 } },
			]);
		}
		return res.status(200).json(movie);
	} catch (err) {
		return res.status(500).json(err);
	}
};

// getall

exports.getAllMovie = async (req, res) => {
	if (req.user.isAdmin) {
		try {
			const allMovies = await Movies.find();
			return res.status(200).json({
				message: "all movies ",
				data: allMovies.reverse(),
			});
		} catch (err) {
			return res.status(500).json(err);
		}
	} else {
		return req.status(403).json("you're not allowed!");
	}
};
