const jwt = require("jsonwebtoken");
const { ApolloError } = require("apollo-server-errors");

const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_TOKEN_STR, { expiresIn: "1w" });
};

const verifyToken = (token) => {
  return jwt.verify(token, process.env.JWT_TOKEN_STR, (err, decoded) => {
    if (err) {
      throw new ApolloError("Unauthorized Token", "UNAUTHORIZED");
    } else return decoded.id;
  });
};

module.exports = { createToken, verifyToken };
