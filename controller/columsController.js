const Colums = require("../model/colums");

class columnscontroller {
  async addColumns(req, res) {
    try {
      const { title, id, MapId } = req.body;
      if (!title) {
        return res
          .status(500)
          .json({ success: false, message: "Title is required" });
      } else {
        const newColumns = await Colums({
          id: id,
          title: title,
          user: req.UserExit,
          MapId: MapId,
        });
        await newColumns.save();
        return res.status(200).json({ success: true, newcolumns: newColumns });
      }
    } catch (err) {
      console.log(err);
    }
  }
  async UpdateColumns(req, res) {
    try {
      const { title, taskIds, id } = req.body;
      let arry = [];
      arry.push(taskIds);
      const PostUpdatecondition = { _id: req.params.id };
      let newOrder;
      if (!taskIds) {
        newOrder = await Colums.findOneAndUpdate(
          PostUpdatecondition,
          {
            title: title,
          },
          { new: true }
        );
      } else {
        newOrder = await Colums.findOneAndUpdate(
          PostUpdatecondition,
          {
            title: title,
            taskIds: arry,
          },
          { new: true }
        );
      }

      await newOrder.save();
      return res.status(200).json({ success: true, newOrder: newOrder });
    } catch (err) {
      console.log(err);
    }
  }
  async UpdateTaskidColumns(req, res) {
    try {
      const { taskIds } = req.body;
      const PostUpdatecondition = { _id: req.params.id };
      let newOrder;
      newOrder = await Colums.findOneAndUpdate(
        PostUpdatecondition,
        {
          taskIds: taskIds,
        },
        { new: true }
      );
      return res.status(200).json({ success: true, newUpdate: newOrder });
    } catch (err) {
      console.log(err);
    }
  }
  async getALLColumns(req, res) {
    try {
      const getALlCol = await Colums.find({
        user: req.UserExit,
      });
      res.status(200).json({ success: true, getALlCol: getALlCol });
    } catch (err) {
      console.log(err);
    }
  }
  async getALLColumnsByMapId(req, res) {
    try {
      const getALlCol = await Colums.find({
        MapId: req.params.Mapid,
      });
      if (!getALlCol) {
        return res.status(500).json({ success: false, messages: "Can't" });
      }
      res.status(200).json({ success: true, getALlCol: getALlCol });
    } catch (err) {
      console.log(err);
    }
  }
  async DeletedColumns_ByID(req, res) {
    try {
      const ColumDetelDcondition = { _id: req.params.id };
      const newOrder = await Colums.findByIdAndDelete(ColumDetelDcondition);
      return res.status(200).json({ success: true, newOrder: newOrder });
    } catch (err) {
      console.log(err);
    }
  }
  async GetOneColumnsByID(req, res) {
    try {
      const { id } = req.body;
      if (!id) {
        const OneColumns = await Colums.findById({
          _id: req.params.id,
        });
        res.status(200).json({ success: true, OneColumns: OneColumns });
      } else {
        const OneColumns = await Colums.findOne({
          id: id,
        });
        res.status(200).json({ success: true, OneColumns: OneColumns });
      }
    } catch (error) {
      res.status(500).json({ success: false, message: "can't found Posts" });
    }
  }
  async GetOneColumnsBy_bodyid(req, res) {
    try {
      const { id } = req.body;
      if (!id) {
        const OneColumns = await Colums.findOne({
          id: id,
        });
        res.status(200).json({ success: true, OneColumns: OneColumns });
      }
    } catch (error) {
      res.status(500).json({ success: false, message: "can't found Posts" });
    }
  }
}
module.exports = new columnscontroller();
