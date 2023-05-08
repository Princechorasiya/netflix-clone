const List = require("../models/List");

exports.createNewList = async (req, res) => {
	if (req.user.isAdmin) {
		const newList = new List(req.body);
		try {
			const savedList = await newList.save();
			return res.status(201).json({
				message: "movie added",
				data: savedList,
			});
		} catch (err) {
			return res.status(500).json(err);
		}
	} else {
		return req.status(403).json("you're not allowed!");
	}
};

// exports.updateList = async (req, res) => {
// 	if (req.user.isAdmin) {
// 		try {
// 			const updatedMovie = await Movies.findByIdAndUpdate(
// 				req.params.id,
// 				{
// 					$set: req.body,
// 				},
// 				{
// 					new: true,
// 				}
// 			);
// 			return res.status(201).json({
// 				message: "movie data",
// 				data: updatedMovie,
// 			});
// 		} catch (err) {
// 			return res.status(500).json(err);
// 		}
// 	} else {
// 		return req.status(403).json("you're not allowed!");
// 	}
// };

exports.deleteList = async (req, res) => {
	if (req.user.isAdmin) {
		try {
			await List.findByIdAndDelete(req.params.id);
			return res.status(201).json({
				message: "List deleted",
			});
		} catch (err) {
			return res.status(500).json(err);
		}
	} else {
		return req.status(403).json("you're not allowed!");
	}
};

// exports.getAMovie = async (req, res) => {
// 	try {
// 		const movie = await Movies.findById(req.params.id);
// 		return res.status(200).json({
// 			message: "movie added",
// 			data: movie,
// 		});
// 	} catch (err) {
// 		return res.status(500).json(err);
// 	}
// };

// exports.getRandomMovie = async (req, res) => {
// 	const type = req.query.type;
// 	let movie;
// 	try {
// 		if (type === "series") {
// 			movie = await Movies.aggregate([
// 				{ $match: { isSeries: true } },
// 				{ $sample: { size: 1 } },
// 			]);
// 		} else {
// 			movie = await Movies.aggregate([
// 				{ $match: { isSeries: false } },
// 				{ $sample: { size: 1 } },
// 			]);
// 		}
// 		return res.status(200).json({
// 			message: "series or movie",
// 			data: movie,
// 		});
// 	} catch (err) {
// 		return res.status(500).json(err);
// 	}
// };

// // getall

exports.getAllList = async (req, res) => {
	const typeQuery = req.query.type;
	const genreQuery = req.query.genre;

	let list = [];

	try {
		if (typeQuery) {
			if (genreQuery) {
				list = await List.aggregate([
					{ $sample: { size: 10 } },
					{ $match: { type: typeQuery, genre: genreQuery } },
				]);
			} else {
				list = await List.aggregate([
					{ $sample: { size: 10 } },
					{ $match: { type: typeQuery } },
				]);
			}
		} else {
			list = await List.aggregate([{ $sample: { size: 10 } }]);
		}
		return res.status(200).json({
			success: true,
			message: "list of movie list",
			data: list,
		});
	} catch (err) {
		return req.status(403).json("you're not allowed!");
	}
};
