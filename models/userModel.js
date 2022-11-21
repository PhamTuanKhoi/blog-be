const mongoose = required("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema({
   username: { type: String, required: true },
   password: { type: String, required: false },
   name: { type: String, required: true },
   dob: { type: String },
   created_at: { type: Number },
});

export default mongoose.model("user", userSchema, "user");
