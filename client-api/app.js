require("dotenv").config();
const express = require("express")
const app = express()
const bodyParser = require("body-parser")
const cors = require("cors")
const helmet = require("helmet")
const morgan = require("morgan")
const port = process.env.PORT || 5000

//API Security
app.use(helmet())
//handle cors error
app.use(cors())

//MongoDB Connection Setup
const mongoose = require("mongoose");
mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});


const db = mongoose.connection;

if (process.env.NODE_ENV !== 'production') {
  db.on("open", () => {
    console.log("MongoDB is connected");
  });

  db.on("error", (error) => {
    console.error("MongoDB connection error:", error);
  });

  // Logger
  app.use(morgan("tiny"));
}




//set body parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//Load Router
const userRouter = require("./src/routers/user.router")
const ticketRouter = require("./src/routers/ticket.router")
const tokensRouter=require("./src/routers/tokens.router")
// use Router
app.use("/v1/user", userRouter)
app.use("/v1/ticket", ticketRouter)
app.use("/v1/tokens", tokensRouter)
//Error handler
const handleError = require('./src/utils/errorHandler')
// Global Error Handler
app.use((req, res, next) => {
  const error = new Error("Resources not found")
  error.status = 404
  next(error)
});
app.use((error, req, res, next) => {
  handleError(error, res)
})


app.listen(port, () => {
  console.log(`API is ready on http://localhost:${port}`)
})
