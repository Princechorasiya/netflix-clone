const router = require("express").Router();
const {
	createNewList,
	deleteList,
	getAllList,
} = require("../controllers/list-controller");
const verify = require("../verifyToken");

router.get("/test", (req, res) => {
	console.log("list running");
	return res.status(200).json("list is running");
});
//create new list
router.post("/", verify, createNewList);
// router.put("/:id",)

// deltee a list
router.delete("/:id", verify, deleteList);

// get all list

router.get("/", verify, getAllList);
module.exports = router;
