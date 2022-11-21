const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const userModel = require("../models/userModel");

const secret = "test";

module.exports = async function signup(req, res) {
   const { username, password, name, dob, created_at } = req.body;
   try {
      const oldUser = await userModel.findOne({ username });

      if (oldUser) {
         return res.status(400).json({ message: "User already exists" });
      }

      const hashedPassword = await bcrypt.hash(password, 12);

      const result = await userModel.create({
         username,
         password: hashedPassword,
         name,
         dob,
         created_at,
      });

      const token = jwt.sign(
         { username: result.username, id: result._id },
         secret,
         {
            expiresIn: "1h",
         }
      );
      res.status(201).json({ result, token });
   } catch (error) {
      res.status(500).json({ message: "Something went wrong" });
      console.log(error);
   }
};
