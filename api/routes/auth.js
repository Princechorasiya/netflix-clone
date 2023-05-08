const router = require("express").Router();

const User = require("../models/User");
const { addNewUser, logInUser } = require("../controllers/auth-controller");

// register
router.post("/register", addNewUser);

//login
router.post("/login", logInUser);

module.exports = router;
