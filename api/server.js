const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const userRoute = require("./routes/user.route");
const gigRoute = require("./routes/gig.route");
const orderRoute = require("./routes/order.route");
const conversationRoute = require("./routes/conversation.route");
const messageRoute = require("./routes/message.route");
const reviewRoute = require("./routes/review.route");
const authRoute = require("./routes/auth.route");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const winston = require("winston");
const { ElasticsearchTransport } = require('winston-elasticsearch');

const app = express();
dotenv.config();
mongoose.set("strictQuery", true);

const logger = winston.createLogger({
  level: 'info',
  transports: [
    new ElasticsearchTransport({
      level: 'info',
      index: 'logs',
      clientOpts: {
        node: 'https://c1ba-119-161-98-68.ngrok-free.app',
      },
    }),
  ],
});

const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO);
    logger.info("Connected to MongoDB");
    console.log("Connected to mongoDB!");
  } catch (error) {
    logger.error(error.message);
    console.log(error);
  }
};

const corsOptions ={
    origin:['http://localhost:5173','http://172.16.131.52:5173','http://13.58.87.111:5173'], 
    credentials:true,
    optionSuccessStatus:200
}
app.use(cors(corsOptions));

app.use(express.json());
app.use(cookieParser());

// Middleware function to log requests and responses
app.use((req, res, next) => {
  logger.info({
    message: "API request",
    method: req.method,
    path: req.path,
    query: req.query,
    body: req.body
  });

  res.on("finish", () => {
    logger.info({
      message: "API response",
      method: req.method,
      path: req.path,
      status: res.statusCode
    });
  });

  next();
});

app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/gigs", gigRoute);
app.use("/api/orders", orderRoute);
app.use("/api/conversations", conversationRoute);
app.use("/api/messages", messageRoute);
app.use("/api/reviews", reviewRoute);

app.use((err, req, res, next) => {
  const errorStatus = err.status || 500;
  const errorMessage = err.message || "Something went wrong!";

  logger.error({
    message: "API request failed",
    endpoint: req.url.slice(1),
    status: errorStatus,
    error: errorMessage
  });

  return res.status(errorStatus).send(errorMessage);
});

app.listen(8800,'0.0.0.0',() => {
  connect();
  logger.info("Server started on port 8800");
  console.log("Backend server is running!");
});

module.exports = app;
