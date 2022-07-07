const jwt = require("jsonwebtoken");
const response = require("../response/responses");
const secretkey =
  "2dceffbe85f1be6ac56b95acd407d516f4643912371c6d4ead8ab44e696dd7fe48e4950eace59b115c63ea6d62caf0a7396fd5892ba5092651b6b174b4927832";
const userModel = require("../models/users.model");
const mongoose = require("mongoose");

const verifyUserToken = (req, res, next) => {
  let token = req.headers["accesstoken"];
  res.lang = req.headers.lang ? req.headers.lang : "en";
  if (!token)
    return response.sendError({ error: false, errorCode: "auth" }, res, 401);
  jwt.verify(token, secretkey, async function (error, decoded) {
    if (error) {
      console.log("------------>Token ERROR", error);
      response.sendError({ error, errorCode: "serverError" }, res, 401);
    } else {
      if (
        decoded.profileType === "user" ||
        decoded.profileType === "employee" ||
        decoded.profileType === "admin" ||
        decoded.profileType === "co-admin"
      ) {
        req.data = {
          profileId: decoded.profileId,
          accessToken: token,
          profileType: decoded.profileType,
        };

        console.log("------------------>>token verified", req.data);
        next();
      } else {
        console.log("Invalid user type");
        response.sendError({ error: false, errorCode: "auth" }, res, 401);
      }
    }
  });
};



module.exports = {
  verifyUserToken,
};
