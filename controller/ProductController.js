const Products = require("../model/product");

class ProductController {
  async CreateProduct(req, res) {
    const { productID, name, picture, loai,status,StoreID,soluong } = req.body;
    if (!StoreID || !name || !picture || !loai || !status || !soluong) {
      res.status(400).json({ success: false, Message: "Input required" });
    } else {
      const newProducts = Products({
        productID,
        name,
        picture,
        loai,
        status,
        StoreID,
        soluong
      });
      const productExist = await Products.findOne({productID : productID, StoreID:StoreID})
      if(productExist){
        return res
        .status(400)
        .json({ success: false, Message: "Product da ton tai" });
      }
      await newProducts.save();
      return res
        .status(200)
        .json({ success: true, newProducts: newProducts, Message: "Create Success" });
    }
  }

  async UpdateProduct(req, res) {
    const { productID, name, picture, loai,status,StoreID,soluong } = req.body;
    if (!productID || !name || !picture || !loai || !status || !soluong || !StoreID) {
      res.status(400).json({ success: false, Message: "Input required" });
    } else {
      let updateProduct = {
        productID,
        name,
        picture,
        loai,
        status,
        StoreID,
        soluong
      };

      const ProductUpdatecondition = { productID: productID, StoreID:StoreID };

      updateProduct = await Products.findOneAndUpdate(
        ProductUpdatecondition,
        updateProduct,
        { new: true }
      );

      return res
        .status(200)
        .json({ success: true, productupdate: updateProduct, Message: "Update Success" });
    }
  }
  async DeletedPost(req, res) {
    const { arraydelted } = req.body
    
    try {
        arraydelted.forEach(async (obj) => {
            const PostUpdatecondition = {  productID: obj.productID, StoreID: obj.StoreID  };
            await Products.findOneAndDelete(PostUpdatecondition);
        });
     
      res.status(200).json({ success: true, message: "Delete success" });
    } catch (err) {
      res.status(500).json({ success: false, message: "can't Deleted Post" });
    }
  }
  
}
module.exports = new ProductController();
