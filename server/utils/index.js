const jwt = require("jsonwebtoken");

const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_TOKEN_STR, { expiresIn: "1d" });
};

module.exports = { createToken };
