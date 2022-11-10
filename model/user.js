const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  CreateAt: {
    type: Date,
    default: Date.now,
  },
  email: {
    type: String,
  },
  ListEmailJoin: [],
  ListEmailRequestJoin: [],
  Maps: [
    {
      id: {
        type: String,
      },
      name: {
        type: String,
      },
      color: [],
    },
  ],
});
module.exports = mongoose.model("users", UserSchema);
