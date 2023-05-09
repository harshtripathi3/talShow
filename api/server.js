import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRoute from "./routes/user.route.js";
import gigRoute from "./routes/gig.route.js";
import orderRoute from "./routes/order.route.js";
import conversationRoute from "./routes/conversation.route.js";
import messageRoute from "./routes/message.route.js";
import reviewRoute from "./routes/review.route.js";
import authRoute from "./routes/auth.route.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import winston from "winston";
import { ElasticsearchTransport } from 'winston-elasticsearch';


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
        node: 'http://172.16.131.52:9200/',
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

app.use(cors({ origin: ["http://localhost:5173","http://18.220.123.152:5173"], credentials: true }));
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

app.listen(8800, () => {
  connect();
  logger.info("Server started on port 8800");
  console.log("Backend server is running!");
});
