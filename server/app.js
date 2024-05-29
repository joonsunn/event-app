const config = require("./utils/config");
const express = require("express");
require("express-async-errors");
const app = express();
const cors = require("cors");
const usersRouter = require("./controllers/users");
const loginRouter = require("./controllers/login");
const eventsRouter = require("./controllers/events");
const middleware = require("./utils/middleware");
const mongoose = require("mongoose");
const path = require("path");

mongoose.set("strictQuery", false);

mongoose
  .connect(config.MONGODB_URI || "")
  .then(() => {
    console.log("connected to MongoDB");
  })
  .catch((error) => {
    console.error("error connecting to MongoDB:", error.message);
  });

app.use(cors());
app.use(express.static("dist"));
app.use(express.json());

app.get("/api", (request, response) => {
  return response.send({ data: "hello" });
});
app.use("/api/login", loginRouter);
// app.use(middleware.tokenExtractor);
// app.use(middleware.userExtractor);
app.use("/api/users", usersRouter);
app.use("/api/events", eventsRouter);

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "dist", "index.html"));
});

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

module.exports = app;
