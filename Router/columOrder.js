const columOrderController = require("../controller/columOrderController");
const verifyToken = require("../middleware/user");
const router = require("express").Router();

router.post("/", verifyToken, columOrderController.addColumnOrder);
router.put("/:id", verifyToken, columOrderController.UpdateColumnOrder);
router.get("/", verifyToken, columOrderController.getALLColumnOrder);

module.exports = router;
