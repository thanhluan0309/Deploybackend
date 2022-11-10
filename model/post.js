const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PostSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  Des: {
    type: String,
  },
  Url: {
    type: String,
  },
  Behavior: {
    type: String,
    enum: ["Learning", "To-Learning"],
  },
  color: {
    type: String,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "users",
  },
  MapId: {
    type: Schema.Types.ObjectId,
  },
});
module.exports = mongoose.model("posts", PostSchema);
