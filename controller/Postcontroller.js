const Post = require("../model/post");

class PostController {
  async CreatePost(req, res) {
    const { title, Des, Url, Behavior, MapId } = req.body;
    if (!title) {
      res.status(400).json({ success: false, Message: "Input required" });
    } else {
      const newPost = Post({
        title,
        Des,
        Url: Url.startsWith("https://") ? Url : `https://${Url}`,
        Behavior: Behavior || "To-Learning",
        color: "#ffa500",
        user: req.UserExit,
        MapId: MapId,
      });
      await newPost.save();
      res
        .status(200)
        .json({ success: true, Post: newPost, Message: "Create Success" });
    }
  }
  async GetPostsOfUser(req, res) {
    try {
      const Userpost = await Post.find({
        user: req.UserExit,
      }).populate("user", ["username"]);
      res.status(200).json({ success: true, Post_of_User: Userpost });
    } catch (err) {
      res.status(500).json(err);
    }
  }
  async UpdatePost(req, res) {
    const { title, Des, Url, Behavior, color } = req.body;
    if (!title) {
      res.status(400).json({ success: false, Message: "Input required" });
    } else {
      let updatePost = {
        title,
        Des: Des || "",
        Url: Url.startsWith("https://") ? Url : `https://${Url}`,
        Behavior: Behavior || "To-Learning",
        color: color,
      };

      const PostUpdatecondition = { _id: req.params.id, user: req.UserExit };
      updatePost = await Post.findOneAndUpdate(
        PostUpdatecondition,
        updatePost,
        { new: true }
      );

      res
        .status(200)
        .json({ success: true, Post: updatePost, Message: "Update Success" });
    }
  }
  async DeletedPost(req, res) {
    try {
      const PostUpdatecondition = { _id: req.params.id };
      const DeletedPost = await Post.findByIdAndDelete(PostUpdatecondition);
      res.status(200).json({ success: true, Deleted_Post: DeletedPost });
    } catch (err) {
      res.status(500).json({ success: false, message: "can't Deleted Post" });
    }
  }

  async GetOnePostByID(req, res) {
    try {
      const Onepost = await Post.findById({
        _id: req.params.id,
        user: req.UserExit,
      });
      res.status(200).json({ success: true, posts: Onepost });
    } catch (error) {
      res.status(500).json({ success: false, message: "can't found Posts" });
    }
  }
  async UpdatePostByMapid(req, res) {
    const { title, Des, Url, Behavior, color } = req.body;
    if (!title) {
      res.status(400).json({ success: false, Message: "Input required" });
    } else {
      let updatePost = {
        title,
        Des: Des || "",
        Url: Url.startsWith("https://") ? Url : `https://${Url}`,
        Behavior: Behavior || "To-Learning",
        color: color,
      };

      const PostUpdatecondition = { MapId: req.params.id};
      updatePost = await Post.findOneAndUpdate(
        PostUpdatecondition,
        updatePost,
        { new: true }
      );

      res
        .status(200)
        .json({ success: true, Post: updatePost, Message: "Update Success" });
    }
  }
  async GetPostsOfUserByMapid(req, res) {
    try {
      const Userpost = await Post.find({
        MapId: req.params.Mapid,
      });
      if (!Userpost) {
        return res.status(500).json({ success: false, message: "Can't find" });
      }
      return res.status(200).json({ success: true, Post_of_User: Userpost });
    } catch (err) {
      return res.status(500).json(err);
    }
  }
}
module.exports = new PostController();
