const Person = require("../models/users.model");
const { successResponse, errorResponse } = require("../utils/response");
const { responseMessage } = require("../utils/responseMessage");
const jwt = require("jsonwebtoken");
exports.createUser = async (req, res) => {
  try {
    const data = req.body;

    const isUserExist = await Person.findOne({ email: data.email });
    if (isUserExist) {
      return errorResponse(res, 400, responseMessage.user_already_exist, responseMessage.user_already_exist);
    }

    const user = new Person(data);

    const savedUser = await user.save();

    if (savedUser) {
      return successResponse(res, 200, responseMessage.user_created, savedUser);
    }
  } catch (err) {
    console.log("err", err);
    return errorResponse(
      res,
      500,
      responseMessage.internal_server_err,
      responseMessage.internal_server_err
    );
  }
};

exports.getUsersList = async (req, res) => {
  try {
    const getUserList = await Person.find();
    if (getUserList) {
      return successResponse(
        res,
        200,
        responseMessage?.user_list_response,
        getUserList
      );
    }
  } catch (err) {
    return errorResponse(res, 500, responseMessage?.internal_server_err, err);
  }
};

exports.updateSingleUser = async (req, res) => {
  try {
    const { id, name, age, work, mobile, address } = req.body;
    const data = req.body;
    const updatedUser = await Person.findByIdAndUpdate(id, data, { new: true });
    if (updatedUser) {
      return successResponse(
        res,
        200,
        responseMessage.user_update_message,
        updatedUser
      );
    } else {
      return errorResponse(
        res,
        404,
        responseMessage.user_not_found_message,
        responseMessage.user_not_found_message
      );
    }
  } catch (err) {
    return errorResponse(res, 500, responseMessage?.internal_server_err, err);
  }
};

exports.deleteSingleUser = async (req, res) => {
  try {
    const userId = req.params.userId;
    const deletedUser = await Person.findByIdAndDelete(userId);
    if (deletedUser) {
      return successResponse(
        res,
        200,
        responseMessage?.user_delete_message,
        deletedUser
      );
    } else {
      return errorResponse(
        res,
        404,
        responseMessage?.user_not_found_message,
        responseMessage?.user_not_found_message
      );
    }
  } catch (err) {
    return errorResponse(res, 500, responseMessage?.internal_server_err, err);
  }
};

exports.signIn = async (req, res) => {
  try {
    if (req.body) {
      const { username, password } = req.body;
      const findUser = await Person.findOne({ email: username });
      if (!findUser) {
        return errorResponse(
          res,
          404,
          responseMessage?.user_not_found_message,
          responseMessage?.user_not_found_message
        );
      } else {
        const payload = { username, password };
        const options = {
          expiresIn: "5min",
        };
        const { name, email } = findUser;
        const token = jwt.sign(payload, process.env.JWT_SECRET_KEY, options);
        if (token) {
          return successResponse(
            res,
            200,
            responseMessage?.user_login_success_message,
            { name, email, token, userType: 1 }
          );
        }
      }
    }
  } catch (err) {
    return errorResponse(res, 500, responseMessage?.internal_server_err, err);
  }
};
