const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const commentSchema = new Schema({
   content: { type: String, required: false },
   created_at: { type: Number },
   owner: { type: ObjectId, ref: "user" },
   blog: { type: ObjectId, ref: "blog" },
});

module.exports = mongoose.model("comment", commentSchema, "comment");
