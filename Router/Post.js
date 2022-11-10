const Postcontroller = require("../controller/Postcontroller");
const verifyToken = require("../middleware/user");
const router = require("express").Router();

router.post("/", verifyToken, Postcontroller.CreatePost);
router.get("/getAllpost", verifyToken, Postcontroller.GetPostsOfUser);
router.post("/getOnePost/:id", verifyToken, Postcontroller.GetOnePostByID);
router.put("/:id", verifyToken, Postcontroller.UpdatePost);
router.get(
  "/GetPostsOfUserByMapid/:Mapid",
  verifyToken,
  Postcontroller.GetPostsOfUserByMapid
);
router.delete("/:id", verifyToken, Postcontroller.DeletedPost);
module.exports = router;
