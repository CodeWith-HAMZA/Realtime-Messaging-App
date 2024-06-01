const jwt = require("jsonwebtoken");

// Utility function to generate JWT token
exports.generateToken = async (payload) => {
  return await jwt.sign(payload, "process.env.JWT_SECRET", {
    expiresIn: "30d",
  });
};

exports.deleteKeyValuePairByValue = async (obj, value) => {
  for (let key in obj) {
    if (obj[key] === value) {
      delete obj[key];
    }
  }
};
