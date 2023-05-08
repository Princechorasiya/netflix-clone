//register new user to database

const User = require("../models/User");
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");

exports.addNewUser = async (req, res) => {
	const newUser = new User({
		username: req.body.username,
		email: req.body.email,
		password: CryptoJS.AES.encrypt(
			req.body.password,
			process.env.SECRET_KEY
		).toString(),
	});
	try {
		const user = await newUser.save();
		const allUser = await User.find();
		// console.log(user);
		res.status(201).json({
			success: true,
			message: "user added",
			dat: allUser,
		});
	} catch (err) {
		res.status(501).json(err);
	}
};

exports.logInUser = async (req, res) => {
	try {
		const user = await User.findOne({ email: req.body.email });
		if (!user) {
			return res.status(401).json({
				success: false,
				message: "no user found",
			});
		}
		const bytes = CryptoJS.AES.decrypt(user.password, process.env.SECRET_KEY);

		const originalPassword = bytes.toString(CryptoJS.enc.Utf8);

		if (originalPassword !== req.body.password) {
			return res.status(401).json({
				success: true,
				message: "wrong password",
			});
		}

		const accessToken = jwt.sign(
			{
				id: user._id,
				isAdmin: user.isAdmin,
			},
			process.env.SECRET_KEY,
			{ expiresIn: "100d" }
		);
		const { password, ...info } = user._doc; //removes the password from the data shown to the user

		return res.status(200).json({
			success: true,
			message: "user",
			data: { ...info, accessToken },
		});
	} catch (err) {
		return res.status(500).json({
			success: false,
			message: "error",
			data: err,
		});
	}
};
