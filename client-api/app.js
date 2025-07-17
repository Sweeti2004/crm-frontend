require("dotenv").config();
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");

const port = process.env.PORT || 5000;

// === Security Middleware ===
app.use(helmet());
app.use(cors());

// === MongoDB Connection Setup ===
const mongoose = require("mongoose");

mongoose.connect(process.env.MONGO_URL);
const db = mongoose.connection;

db.on("open", () => {
  console.log("✅ MongoDB is connected");
});

db.on("error", (error) => {
  console.error("❌ MongoDB connection error:", error);
});

// === Logger (only in development) ===
if (process.env.NODE_ENV !== 'production') {
  app.use(morgan("tiny"));
}

// === Body Parser ===
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// === Routers ===
const userRouter = require("./src/routers/user.router");
const ticketRouter = require("./src/routers/ticket.router");
const tokensRouter = require("./src/routers/tokens.router");

app.use("/v1/user", userRouter);
app.use("/v1/ticket", ticketRouter);
app.use("/v1/tokens", tokensRouter);

// === Root Route for health check ===
app.get("/", (req, res) => {
  res.send("🎉 Welcome to the Service Desk API!");
});

// === 404 Not Found Handler ===
app.use((req, res, next) => {
  const error = new Error("Resources not found");
  error.status = 404;
  next(error);
});

// === Global Error Handler ===
const handleError = require("./src/utils/errorHandler");
app.use((error, req, res, next) => {
  handleError(error, res);
});

// === Start Server ===
app.listen(port, () => {
  console.log(`🚀 API is ready on http://localhost:${port}`);
});
