const columsController = require("../controller/columsController");
const verifyToken = require("../middleware/user");
const router = require("express").Router();

router.get("/", verifyToken, columsController.getALLColumns);
router.get("/:Mapid",verifyToken,columsController.getALLColumnsByMapId)
router.post("/", verifyToken, columsController.addColumns);
router.post("/:id", verifyToken, columsController.GetOneColumnsByID);
router.post("/getIdinit",verifyToken,columsController.GetOneColumnsBy_bodyid)

router.put("/:id", verifyToken, columsController.UpdateColumns);

router.put("/updatetaskid/:id", verifyToken, columsController.UpdateTaskidColumns);
router.delete("/:id", verifyToken, columsController.DeletedColumns_ByID);

module.exports = router;
