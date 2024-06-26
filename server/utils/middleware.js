const jwt = require("jsonwebtoken");
const User = require("../models/users");
const config = require("../utils/config");

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: "unknown endpoint" });
};

const errorHandler = (error, request, response, next) => {
  console.error(error.message);

  if (error.name === "CastError") {
    return response.status(400).send({ error: "malformatted id" });
  } else if (error.name === "ValidationError") {
    return response.status(400).json({ error: error.message });
  } else if (error.name === "JsonWebTokenError") {
    return response.status(400).json({ error: error.message });
  } else if (error.name === "TokenExpiredError") {
    return response.status(401).json({ error: "token expired" });
  } else if (error._body === "jwt must be provided") {
    return response.status(401).json({ error: error.message });
  }

  next(error);
};

const tokenExtractor = (request, response, next) => {
  const authorization = request.get("Authorization");
  if (authorization && authorization.startsWith("Bearer")) {
    request.token = authorization.replace("Bearer ", "");
  } else {
    return response.status(401).json({ error: "Unauthorized" }).end();
  }

  next();
};

const userExtractor = async (request, response, next) => {
  const decodedToken = jwt.verify(request.token, config.SECRET);
  if (!decodedToken.id) {
    return response.status(401).json({ error: "token invalid" });
  } else {
    request.user = await User.findById(decodedToken.id);
    // console.log(decodedToken)
  }
  next();
};

const adminGatekeeper = (request, response, next) => {
  if (request.user.role !== "admin") {
    return response.status(401).json({ error: "unauthorized" }).end();
  }
  next();
};

module.exports = {
  //   requestLogger,
  unknownEndpoint,
  errorHandler,
  tokenExtractor,
  userExtractor,
  adminGatekeeper,
};
