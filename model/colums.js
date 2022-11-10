const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ColumSchema = new Schema({
  id: {
    type: String,
  },
  title: {
    type: String,
  },
  taskIds: [],
  user: {
    type: Schema.Types.ObjectId,
    ref: "users",
  },
  MapId: {
    type: Schema.Types.ObjectId,
  },
});
module.exports = mongoose.model("colums", ColumSchema);
