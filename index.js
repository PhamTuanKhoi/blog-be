const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const userRouter = require("./routers/user.route");
const postsRouter = require("./routers/post.route");
const cmtRouter = require("./routers/cmt.route");

//connect db
mongoose
   .connect(process.env.MONGODB_URL)
   .then(() => {
      console.log(`Connect mongoose successs`);
   })
   .catch((error) => console.log(`${error} did not connect`));

//settup app
const app = express();

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const port = 3005;
app.listen(port, () => {
   console.log(`Server Started at ${port}`);
});

app.use("/users", userRouter);
app.use("/posts", postsRouter);
app.use("/cmt", cmtRouter);
app.get("/", (req, res) => {
   res.send("Welcome to tour API");
});
