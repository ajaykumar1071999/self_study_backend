const express = require("express");
const {
  createUser,
  getUsersList,
  updateSingleUser,
  deleteSingleUser,
} = require("../controllers/users.controller");
const router = express.Router();
router.post("/createUser", createUser);
router.get("/getUsersList", getUsersList);
router.put("/updateUser", updateSingleUser);
router.delete("/deleteOneUser/:userId", deleteSingleUser);
module.exports = router;
