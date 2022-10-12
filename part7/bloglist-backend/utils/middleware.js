const logger = require("./logger");
const jwt = require("jsonwebtoken");

const requestLogger = (req, res, next) => {
  logger.info("Method:", req.method);
  logger.info("Path:  ", req.path);
  logger.info("Body:  ", req.body);
  logger.info("---");
  next();
};

const tokenExtractor = (req, res, next) => {
  const authorization = req.get("Authorization");
  if (authorization && authorization.toLowerCase().startsWith("bearer ")) {
    req.token = authorization.substring(7);
  }

  next();
};

const userExtractor = (req, res, next) => {
  if (req.method.toLowerCase() === "get") {
    return next();
  }

  const token = req.token;
  if (!token) {
    return res.status(401).json({ error: "Token missing or invalid" });
  }

  const decodedToken = jwt.verify(token, process.env.SECRET);
  req.user = decodedToken.id;

  next();
};

const unknownEndpoint = (req, res) => {
  res.status(404).send({ error: "Unknown endpoint" });
};

const errorHandler = (err, req, res, next) => {
  const { name, message: fullMessage } = err;
  const message = fullMessage.split(": ").pop();
  logger.error({ name, fullMessage });

  if (name === "CastError") {
    return res.status(400).send({ error: "Malformatted id" });
  } else if (name === "ValidationError") {
    return res.status(400).json({ error: message });
  } else if (name === "JsonWebTokenError") {
    return res.status(401).json({ error: "Invalid token" });
  } else if (name === "TokenExpiredError") {
    return res.status(401).json({ error: "Token expired" });
  }

  next(err);
};

module.exports = {
  requestLogger,
  tokenExtractor,
  userExtractor,
  unknownEndpoint,
  errorHandler,
};
