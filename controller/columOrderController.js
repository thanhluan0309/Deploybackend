const ColumOrder = require("../model/columOrder");

class columnOrdercontroller {
  async addColumnOrder(req, res) {
    try {
      const newOrder = await ColumOrder({
        user: req.UserExit,
      });
      await newOrder.save();
      res.status(200).json({ success: true, newOrder: newOrder });
    } catch (err) {
      console.log(err);
    }
  }

  async UpdateColumnOrder(req, res) {
    try {
      const { columOrder } = req.body;
      let arry = [];
      arry.push(columOrder);
      const PostUpdatecondition = { _id: req.params.id, user: req.UserExit };
      const newOrder = await ColumOrder.findOneAndUpdate(
        PostUpdatecondition,
        {
          columOrder: arry,
        },
        { new: true }
      );
      await newOrder.save();
      res.status(200).json({ success: true, newOrder: newOrder });
    } catch (err) {
      console.log(err);
    }
  }
  async getALLColumnOrder(req, res) {
    try {
      const getALlCol = await ColumOrder.find({
        user: req.UserExit,
      });
      res.status(200).json({ success: true, getALlColOrder: getALlCol });
    } catch (err) {
      console.log(err);
    }
  }
}
module.exports = new columnOrdercontroller();
