const StoreController = require("../controller/StoreController");

const router = require("express").Router();

router.post("/create", StoreController.CreateStore);
router.put("/update",StoreController.UpdateStore)

router.post("/delete",StoreController.DeletedStore)
module.exports = router;
