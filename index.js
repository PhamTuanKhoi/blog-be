const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const userRouter = require("./routers/user.route");

//connect db
mongoose
   .connect(process.env.MONGODB_URL)
   .then(() => {
      console.log(`Connect mongoose successs`);
   })
   .catch((error) => console.log(`${error} did not connect`));

//settup app
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

const port = 3001;
app.listen(port, () => {
   console.log(`Server Started at ${port}`);
});

app.use("/users", userRouter);
// app.use("/posts", postsRouter);
app.get("/", (req, res) => {
   res.send("Welcome to tour API");
});
