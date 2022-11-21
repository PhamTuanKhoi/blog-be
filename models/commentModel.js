const mongoose = required("mongoose");

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const commentSchema = new Schema({
   content: { type: String, required: false },
   created_at: { type: Number },
   owner: { type: ObjectId, ref: "user" },
   blog: { type: ObjectId, ref: "blog" },
});

export default mongoose.model("comment", commentSchema, "comment");
