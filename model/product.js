const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ProductSchema = new Schema({
  productID: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  picture:{
    type: String,
    required: true,
  },
  loai: {
    type: String,
    required: true,
  },
  soluong: {
    type: String,
    required: true,
  },
  status : {
    type: String,
    required: true,
  },
  StoreID : {
    type: String,
    required: true,
  },
  
});
module.exports = mongoose.model("products", ProductSchema);
