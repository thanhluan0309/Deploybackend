const Map = require("../model/map");
const Post = require("../model/post");
class Mapcontroller {
  async createMap(req, res) {
    try {
      const { name } = req.body;
      if (!name) {
        res.status(400).json({ success: false, Message: "Input required" });
      } else {
        const getMap = Map({
          name: name,
          color: [],
          MapId: [],
          user: req.UserExit,
        });
        await getMap.save();
        res
          .status(200)
          .json({ success: true, Message: "Create success", map: getMap });
      }
    } catch (error) {
      console.log(error);
    }
  }
  async getAllMapById(req, res) {
    try {
      const getAll = await Map.find({ user: req.UserExit });
      if (!getAll) {
        return res
          .status(500)
          .json({ success: false, mapgetall: "Can't find" });
      }
      return res.status(200).json({ success: true, mapgetall: getAll });
    } catch (error) {
      console.log(error);
    }
  }
  async getOneMapBy_Id(req, res) {
    try {
      const getAll = await Map.findById({ _id: req.params.id });
      if (!getAll) {
        return res
          .status(500)
          .json({ success: false, mapgetall: "Can't find" });
      }
      return res.status(200).json({ success: true, mapget: getAll });
    } catch (error) {
      console.log(error);
    }
  }

  async UpdateMapColor(req, res) {
    try {
      const { color } = req.body;
      if (!color) {
        return res
          .status(400)
          .json({ success: false, Message: "Input required" });
      } else {
        const updateMap = await Map.findByIdAndUpdate(
          { _id: req.params.id },
          { color: color },
          { new: true }
        );
        res.status(200).json({ success: true, mapUpdate: updateMap });
      }
    } catch (error) {
      console.log(error);
    }
  }
  async DeletedMap(req, res) {
    try {
      await Map.findByIdAndDelete({ _id: req.params.id });
      res.status(200).json({ success: true, mesage: "Deleted success" });
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = new Mapcontroller();
