const router = require("express").Router();
const {
	createNewMovie,
	updateMovie,
	deleteMovie,
	getAMovie,
	getRandomMovie,
	getAllMovie,
} = require("../controllers/movie-controller");
const verify = require("../verifyToken");

// router.get("/", (req, res) => {
// 	console.log("movies runninhg");
// 	return res.status(200).json("movie runninh");
// });
//create a new movie
router.post("/", verify, createNewMovie);

//update teh movie
router.put("/:id", verify, updateMovie);

// /delte the movie

router.delete("/:id", verify, deleteMovie);

// get a movies

router.get("/find/:id", getAMovie);

// get random
router.get("/random", verify, getRandomMovie);
router.get("/", verify, getAllMovie);

//get all

module.exports = router;
