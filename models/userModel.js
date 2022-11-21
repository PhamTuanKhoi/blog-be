const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema({
   username: { type: String, required: true },
   password: { type: String, required: false },
   name: { type: String, required: true },
   dob: { type: String },
   created_at: { type: Number },
});

module.exports = mongoose.model("user", userSchema, "user");
