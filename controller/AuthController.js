const User = require("../model/user");
const argon2 = require("argon2");
const jwt = require("jsonwebtoken");
require("dotenv").config();

class UserController {
  async Accespublc(req, res) {
    const { username, password, email } = req.body;
    if (!username || !password || !email) {
      return res.status(400).json({
        success: false,
        message: "Missing Username or passowrd or email",
      });
    } else {
      const UserExit = await User.findOne({ username: username });
      const EmailExit = await User.findOne({ email: email });
      if (EmailExit) {
        return res
          .status(400)
          .json({ succes: false, message: "Email Already Exist" });
      }
      if (UserExit) {
        return res
          .status(400)
          .json({ succes: false, message: "User name Already Exist" });
      } else {
        const hashpassword = await argon2.hash(password);
        const newUser = User({
          username,
          password: hashpassword,
          email: email,
          ListEmailJoin: [],
          ListEmailRequestJoin: [],
          Maps: [],
        });
        await newUser.save();
        const Accesstoken = jwt.sign(
          { UserExit: newUser._id },
          process.env.Accestoken
        );
        res
          .status(200)
          .json({ success: true, message: "Create User success", Accesstoken });
      }
    }
  }
  async Login(req, res) {
    const { username, password } = req.body;
    if (!username || !password) {
      return res
        .status(400)
        .json({ success: false, message: "Missing username or password" });
    } else {
      const UserExit = await User.findOne({ username: username });
      if (!UserExit) {
        return res
          .status(400)
          .json({ success: false, message: "Username Invalid" });
      } else {
        const passwordValid = await argon2.verify(UserExit.password, password);
        if (!passwordValid) {
          return res
            .status(400)
            .json({ success: false, message: "password Invalid" });
        } else {
          const Accesstoken = jwt.sign(
            { UserExit: UserExit._id },
            process.env.Accestoken
          );
          let JWTCODE =
            password +
            "#" +
            username +
            "#" +
            UserExit._id +
            "#" +
            UserExit.email;
          const CODE_SHARE = jwt.sign(
            { CODESHARE: JWTCODE },
            process.env.Accestoken
          );
          res.status(200).json({
            success: true,
            user: UserExit,
            Accesstoken: Accesstoken,
            CODE_SHARE: CODE_SHARE,
            message: "Dang nhap thanh cong",
          });
        }
      }
    }
  }

  async checkAccsessToken(req, res) {
    try {
      const finduser = await User.findById(req.UserExit).select("-password");
      if (!finduser) {
        return res
          .status(400)
          .json({ success: false, message: "User not found" });
      }
      res.status(200).json({ success: true, user: finduser });
    } catch (error) {
      console.log(error);
      return res
        .status(400)
        .json({ success: false, message: "Internal server error" });
    }
  }
  async updateListUser(req, res) {
    try {
      const { ListEmailJoin, ListEmailRequestJoin } = req.body;
      const UserUpdatecondition = { _id: req.params.id };
      let arryListEmailJoin = [];
      let arryListEmailRequestJoin = [];
      if (ListEmailJoin && ListEmailRequestJoin) {
        arryListEmailJoin = ListEmailJoin;
        arryListEmailRequestJoin = ListEmailRequestJoin;
        let updateUser = await User.findOneAndUpdate(
          UserUpdatecondition,
          {
            ListEmailJoin: arryListEmailJoin,
            ListEmailRequestJoin: arryListEmailRequestJoin,
          },
          { new: true }
        );
        await updateUser.save();
        return res.status(200).json({ success: true, updateUser: updateUser });
      }
      if (ListEmailJoin && ListEmailJoin !== []) {
        arryListEmailJoin = ListEmailJoin;
        let updateUser = await User.findOneAndUpdate(
          UserUpdatecondition,
          {
            ListEmailJoin: arryListEmailJoin,
          },
          { new: true }
        );
        await updateUser.save();
        return res.status(200).json({ success: true, updateUser: updateUser });
      }
      if (ListEmailRequestJoin && ListEmailRequestJoin !== []) {
        arryListEmailRequestJoin = ListEmailRequestJoin;
        let updateUser = await User.findOneAndUpdate(
          UserUpdatecondition,
          {
            ListEmailRequestJoin: arryListEmailRequestJoin,
          },
          { new: true }
        );
        await updateUser.save();
        return res.status(200).json({ success: true, updateUser: updateUser });
      }
    } catch (err) {
      console.log(err);
    }
  }
  async updateMapsOfUserBy_id(req, res) {
    try {
      const { Maps } = req.body;
      let listMaps = [];
      const UserUpdatecondition = { _id: req.params.id };
      if (Maps) {
        listMaps = Maps;
        let updateUser = await User.findOneAndUpdate(
          UserUpdatecondition,
          {
            Maps: listMaps,
          },
          { new: true }
        );
        await updateUser.save();
        return res.status(200).json({ success: true, updateUser: updateUser });
      }
    } catch (err) {
      console.log(err);
    }
  }
  async GetMapOfUser(req, res) {
    try {
      const Userpost = await User.findOne({
        _id: req.UserExit,
      });
      res.status(200).json({ success: true, Map_of_User: Userpost });
    } catch (err) {
      res.status(500).json(err);
    }
  }
}
module.exports = new UserController();
