const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const StoreSchema = new Schema({
  StoreID: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  BranchId: {
    type: String,
    required: true,
  },
  status : {
    type: String,
    required: true,
  }
});
module.exports = mongoose.model("stores", StoreSchema);
