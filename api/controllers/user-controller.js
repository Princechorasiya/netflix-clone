const User = require("../models/User");
const CryptoJS = require("crypto-js");

//update the user

exports.updateUser = async (req, res) => {
	if (req.user.id === req.params.id || req.user.isAdmin) {
		if (req.body.password) {
			req.body.password = CryptoJS.AES.encrypt(
				req.body.password,
				process.env.SECRET_KEY
			).toString();
		}

		try {
			const updatedUser = await User.findByIdAndUpdate(
				req.params.id,
				{
					$set: req.body,
				},
				{
					new: true,
				}
			);
			return res.status(200).json({
				success: true,
				message: "user updated",
				data: updatedUser,
			});
		} catch (err) {
			return res.status(500).json({
				success: false,
				message: "error has occurred in updating the user",
				data: err,
			});
		}
	} else {
		return res.status(500).json({
			success: false,
			message: "You can update only ur account",
		});
	}
};

exports.deleteUser = async (req, res) => {
	const { id } = req.params;
	if (req.user.id === req.params.id || req.user.isAdmin) {
		try {
			await User.findByIdAndDelete({ _id: id });
			// const allUser = await User.find();
			return res.status(200).json({
				success: true,
				message: "user deleted",
				// data: allUser,
			});
		} catch (err) {
			return res.status(500).json({
				success: false,
				message: "error has occurred in deleting  the user",
				data: err,
			});
		}
	} else {
		return res.status(500).json({
			success: false,
			message: "You can delete only ur account",
		});
	}
};

exports.getAUser = async (req, res) => {
	const { id } = req.params;

	try {
		const user = await User.findById({ _id: id });
		// const allUser = await User.find();
		return res.status(200).json({
			success: true,
			message: "user d",
			data: user,
		});
	} catch (err) {
		return res.status(500).json({
			success: false,
			message: "error has occurred in fetching  the user",
			data: err,
		});
	}
};

exports.getAllUsers = async (req, res) => {
	const query = req.query.new;
	// console.log(query);
	if (req.user.isAdmin) {
		try {
			// await User.find();
			const allUser = query ? await User.find().limit(8) : await User.find();
			return res.status(200).json({
				success: true,
				message: "user all",
				data: allUser,
			});
		} catch (err) {
			return res.status(500).json({
				success: false,
				message: "error has occurred in fetching all   the user",
				data: err,
			});
		}
	} else {
		return res.status(500).json({
			success: false,
			message: "You are not admin",
		});
	}
};

// get use stast
exports.getStats = async (req, res) => {
	const today = new Date();
	const lastYear = today.setFullYear(today.setFullYear() - 1);
	const monthsArray = [
		"January",
		"February",
		"March",
		"April",
		"May",
		"June",
		"July",
		"August",
		"September",
		"October",
		"November",
		"December",
	];

	try {
		const data = await User.aggregate([
			{
				$project: {
					month: { $month: "$createdAt" },
					// year: { $year: "$createdAt" },
				},
			},
			{
				$group: {
					// _id: "$year",
					_id: "$month",

					total: { $sum: 1 },
				},
			},
			//mongo
		]);

		return res.status(200).json({
			success: true,
			message: "user stats",
			data: data,
		});
	} catch (err) {
		return res.status.json(err);
	}
};
