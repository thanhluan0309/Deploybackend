const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const MapSchema = new Schema({
  name: {
    type: String,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "users",
  },
  color: [
    {
      NameColor: String,
      color: String,
    },
  ],
});
module.exports = mongoose.model("maps", MapSchema);
