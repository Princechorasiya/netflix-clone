const {
	updateUser,
	deleteUser,
	getAUser,
	getAllUsers,
	getStats,
} = require("../controllers/user-controller");

const router = require("express").Router();
const verify = require("../verifyToken");

// router.get("/", (req, res) => {
// 	res.status(200).json("users running");
// });
// update
router.put("/:id", verify, updateUser);

//delete the user

router.delete("/:id", verify, deleteUser);

// get a user
router.get("/find/:id", getAUser);

// get all users only admin
router.get("/", verify, getAllUsers);
router.get("/stats", getStats);

// get user stats
module.exports = router;
