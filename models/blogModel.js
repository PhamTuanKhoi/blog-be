const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const blogSchema = new Schema({
   title: { type: String, required: true },
   content: { type: String, required: true },
   created_at: { type: Number },
   tags: [],
   owner: { type: ObjectId, ref: "user" },
});

module.exports = mongoose.model("blog", blogSchema, "blog");
