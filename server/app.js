const config = require("./utils/config");
const express = require("express");
require("express-async-errors");
const app = express();
const cors = require("cors");
const usersRouter = require("./controllers/users");
const loginRouter = require("./controllers/login");
const eventsRouter = require("./controllers/events");
const middleware = require("./utils/middleware");
// const logger = require("./utils/logger");
const mongoose = require("mongoose");
const path = require("path");

mongoose.set("strictQuery", false);

// logger.info('connecting to', config.MONGODB_URI)

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

// app.use("/api/assets", assetsRouter);

app.get("/api", (request, response) => {
  return response.send({ data: "hello" });
});
app.use("/api/login", loginRouter);
// app.use(middleware.tokenExtractor);
// app.use(middleware.userExtractor);
app.use("/api/users", usersRouter);
app.use("/api/events", eventsRouter);

// app.use("/api/transactions", transactionsRouter);
// app.use("/api/assetSearch", assetSearchRouter);

// if(process.env.NODE_ENV === 'test'){
// 	const testingRouter = require('./controllers/testing')
// 	app.use('/api/testing', testingRouter)
// }

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "dist", "index.html"));
});

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

module.exports = app;
