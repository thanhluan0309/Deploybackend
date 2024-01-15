const Stores = require("../model/store");

class PostController {
  async CreateStore(req, res) {
    const { StoreID, name, BranchId, status } = req.body;
    if (!StoreID || !name || !BranchId || !status) {
      res.status(400).json({ success: false, Message: "Input required" });
    } else {
      const newStores = Stores({
        StoreID,
        name,
        BranchId,
        status,
      });
      const StoreExist = await Stores.findOne({StoreID : StoreID, BranchId:BranchId})
      if(StoreExist){
        return res
        .status(400)
        .json({ success: false, Message: "Store da ton tai" });
      }
      await newStores.save();
      res
        .status(200)
        .json({ success: true, newStores: newStores, Message: "Create Success" });
    }
  }
  async UpdateStore(req, res) {
    const { StoreID, name, BranchId, status } = req.body;
    if (!StoreID || !name || !BranchId || !status) {
      res.status(400).json({ success: false, Message: "Input required" });
    } else {
      let updateStore = {
        StoreID,
        name,
        BranchId,
        status,
      };

      const StoreUpdatecondition = { StoreID: StoreID, BranchId:BranchId };

      updateStore = await Stores.findOneAndUpdate(
        StoreUpdatecondition,
        updateStore,
        { new: true }
      );

      return res
        .status(200)
        .json({ success: true, updateStore: updateStore, Message: "Update Success" });
    }
  }
  async DeletedStore(req, res) {
    const { arraydelted } = req.body
    
    try {
        arraydelted.forEach(async (obj) => {
            const PostUpdatecondition = {  StoreID: obj.StoreID, BranchId:obj.BranchId  };
            await Stores.findOneAndDelete(PostUpdatecondition);
        });
     
      res.status(200).json({ success: true, message: "Delete success" });
    } catch (err) {
      res.status(500).json({ success: false, message: "can't Deleted Post" });
    }
  }
}
module.exports = new PostController();
