const jwt = require("jsonwebtoken");
const { errorResponse } = require("../utils/response");
const { responseMessage } = require("../utils/responseMessage");
require("dotenv").config();
const authUser = (req, res, next) => {
  const token = req.headers["x-auth-token"];
  if (!token) {
    return errorResponse(
      res,
      401,
      responseMessage?.token_not_provided_message,
      responseMessage?.token_not_provided_message
    );
  }
  try {
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.user = decodedToken;
    next();
  } catch (err) {
    return errorResponse(
      res,
      403,
      responseMessage?.invalid_token_message,
      responseMessage?.invalid_token_message
    );
  }
};
module.exports = authUser;
