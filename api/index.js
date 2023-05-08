const express = require("express");

const app = express();
const mongoose = require("mongoose");

const dotenv = require("dotenv");

const authRouter = require("./routes/auth");
const userRouter = require("./routes/users");
const movieRouter = require("./routes/movies");
const listRouter = require("./routes/list");
dotenv.config();

mongoose
	.connect(process.env.MONGO_URL, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
		// useCreateIndex: true,
	})
	.then(() => console.log("Db connected"))
	.catch((err) => console.log(err));

app.use(express.json());
app.use("/api/auth", authRouter);
app.use("/api/users", userRouter);
app.use("/api/movies", movieRouter);
app.use("/api/list", listRouter);
app.get("/", (req, res) => {
	res.status(200).json({ message: "server running" });
});
app.listen(8081, () => {
	console.log("server running on port  ");
});
