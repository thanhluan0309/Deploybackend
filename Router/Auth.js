const router = require("express").Router();
const AuthController = require("../controller/AuthController");
const verifyToken = require("../middleware/user");
//@Register
router.post("/Login", AuthController.Login);
router.post("/", AuthController.Accespublc);
router.get("/getAllMapOfUser",verifyToken, AuthController.GetMapOfUser);


router.put("/:id", AuthController.updateListUser);
router.put("/updateMap/:id", AuthController.updateMapsOfUserBy_id);

router.get("/", verifyToken, AuthController.checkAccsessToken);

module.exports = router;
