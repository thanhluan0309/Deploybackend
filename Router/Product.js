const ProductController = require("../controller/ProductController");

const router = require("express").Router();

router.post("/create", ProductController.CreateProduct);
router.put("/update",ProductController.UpdateProduct)
router.post("/delete",ProductController.DeletedPost)
module.exports = router;
