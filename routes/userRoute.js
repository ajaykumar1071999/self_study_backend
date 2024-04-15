const express = require("express");
const {
  createUser,
  getUsersList,
  updateSingleUser,
  deleteSingleUser,
  signIn,
} = require("../controllers/users.controller");
const {
  createUserLogTimeMiidleWare,
} = require("../middleware/createdLogTime.middleware");
const authUser = require("../middleware/authUser.middleware");
const router = express.Router();
router.post("/createUser", createUserLogTimeMiidleWare, createUser);
router.get("/getUsersList",authUser, getUsersList);
router.put("/updateUser", updateSingleUser);
router.delete("/deleteOneUser/:userId", deleteSingleUser);
router.post("/login",signIn);
module.exports = router;
