const Person = require("../models/users.model");
const { successResponse, errorResponse } = require("../utils/response");
const { responseMessage } = require("../utils/responseMessage");

exports.createUser = async (req, res) => {
  try {
    const data = req.body;

    const isUserExist = await Person.findOne({ email: data.email });
    if (isUserExist) {
      console.log('userExist',isUserExist)
      return errorResponse(res, 400, responseMessage.user_already_exist, responseMessage.user_already_exist)
    }

    const user = new Person(data);

    const savedUser = await user.save();


    if (savedUser) {
      return successResponse(res, 200, responseMessage.user_created, savedUser);
    }
  } catch (err) {
    console.log('err',err)
    return errorResponse(res, 500, responseMessage.internal_server_err, err);
  }
};

exports.getUsersList = async (req, res) => {
  try {
    const getUserList = await Person.find();
    if (getUserList) {
      res
        .status(200)
        .json({ message: "Users List", success: true, getUserList });
    }
  } catch (err) {
    console.log(err);
  }
};

exports.updateSingleUser = async (req, res) => {
  try {
    const { id, name, age, work, mobile, address } = req.body;
    const data = req.body;
    const updatedUser = await Person.findByIdAndUpdate(id, data, { new: true });
    if (updatedUser) {
      res.status(200).json({ success: true, message: "User updated successfully.", updatedUser });
    } else {
      res.status(404).json({ success: false, message: "No userfound.", })

    }
    console.log('updatedUser', updatedUser)
    // const findUser = await Person.findOne({ _id: id });
    // console.log('find user',findUser)
    // if (findUser) {
    //   const updatedUser = await Person.updateOne(
    //     { _id: id },
    //     {
    //       $set: { name: name },
    //       $set: { age: age },
    //       $set: { work: work },
    //       $set: { mobile: mobile },
    //       $set: { address: address },
    //     }
    //   );
    //   console.log("updatedUser", updatedUser);
    //   const getList = await Person.findOne({ _id: id });

    //   res.status(200).json({success:true,message:"User updated successfully.",getList})
    // }
    console.log("req.body", req.body);
  } catch (err) {
    console.log("err", err);
  }
};

exports.deleteSingleUser = async (req, res) => {
  try {
    const userId = req.params.userId;
    const deletedUser = await Person.findByIdAndDelete(userId);
    if (deletedUser) {
      res.status(200).json({ success: true, message: "User deleted successfully.", deletedUser });
    } else {
      res.status(404).json({ success: false, message: "User not found.", deletedUser });

    }
  } catch (err) {
    console.log(err);
  }
};
