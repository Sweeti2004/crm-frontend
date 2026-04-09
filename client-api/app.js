require("dotenv").config();
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const path = require("path");
const fs = require("fs");

const port = process.env.PORT || 5000;

// === Security Middleware ===
app.use(helmet());
app.use(cors({
  origin: process.env.FRONTEND_URL || "*",
  credentials: true
}));

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

// === API Routers ===
const userRouter = require("./src/routers/user.router");
const ticketRouter = require("./src/routers/ticket.router");
const tokensRouter = require("./src/routers/tokens.router");

app.use("/v1/user", userRouter);
app.use("/v1/ticket", ticketRouter);
app.use("/v1/tokens", tokensRouter);

// === Serve Static React Build ===
const buildPath = path.join(__dirname, '../frontend/build');
app.use(express.static(buildPath));

// === Root Route for health check (API) ===
app.get("/api/health", (req, res) => {
  res.json({ 
    status: "success",
    message: "🎉 Welcome to ResolveHub Service Desk API!",
    environment: process.env.NODE_ENV || "development"
  });
});

// === 404 Not Found Handler ===
app.use((req, res, next) => {
  // Check if the file exists in the static build folder
  const filePath = path.join(buildPath, req.path);
  if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
    return next(); // Let express.static handle it
  }
  
  // For non-API routes not found, serve React index.html (SPA fallback)
  if (!req.path.startsWith('/v1/') && !req.path.startsWith('/api/')) {
    return res.sendFile(path.join(buildPath, 'index.html'));
  }
  
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
  console.log(`🚀 ResolveHub API is ready on http://localhost:${port}`);
  console.log(`📦 Environment: ${process.env.NODE_ENV || 'development'}`);
});
