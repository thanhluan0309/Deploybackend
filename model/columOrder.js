const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ColumOrderSchema = new Schema({
  columOrder: [],
  user: {
    type: Schema.Types.ObjectId,
    ref: "users",
  },
});
module.exports = mongoose.model("columOrders", ColumOrderSchema);
