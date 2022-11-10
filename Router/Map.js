const router = require("express").Router();
const MapController = require("../controller/MapController");
const verifyToken = require("../middleware/user");

router.post("/", verifyToken, MapController.createMap);
router.get("/getAllMapById/", verifyToken, MapController.getAllMapById);
router.put("/:id", verifyToken, MapController.UpdateMapColor);
router.get("/:id",verifyToken,MapController.getOneMapBy_Id)

router.delete("/:id", verifyToken, MapController.DeletedMap);
module.exports = router;
