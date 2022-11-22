const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const userModel = require("../models/userModel");

const secret = "test";

class userController {
   async signin(req, res) {
      const { username, password } = req.body;

      try {
         const oldUser = await userModel.findOne({ username });
         if (!oldUser) return res.status(404).json({ message: "User doesn't exist" });

         const isPasswordCorrect = await bcrypt.compare(password, oldUser.password);

         if (!isPasswordCorrect) return res.status(400).json({ message: "Invalid credentials" });

         const token = jwt.sign({ username: oldUser.username, id: oldUser._id }, secret, {
            expiresIn: "1h",
         });

         res.status(200).json({ user: { ...oldUser, password: 0 }, token });
      } catch (error) {
         res.status(500).json({ message: "Something went wrong" });
         console.log(error);
      }
   }

   async signup(req, res) {
      const { username, password, name } = req.body;

      let date = new Date();
      let dob = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
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
            created_at: date.getTime(),
         });

         res.status(201).json({ result });
      } catch (error) {
         res.status(500).json({ message: "Something went wrong" });
         console.log(error);
      }
   }
}

module.exports = new userController();
