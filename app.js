require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const createHttpErrors = require("http-errors");

app.use(cors());
app.use(express.json());

app.get("/", async (req, res) => {
  res.send("hello");
});

app.use("/api/tourist-spots", require("./routes/touristSpot.route"));

app.get("*", (req, res, next) => {
  next(createHttpErrors(404, "Route not found"));
});

app.use((err, req, res, next) => {
  let errorCode = 500;
  let errorMessage = "Something went wrong";

  if (createHttpErrors.isHttpError(err)) {
    errorCode = err.statusCode;
    errorMessage = err.message;
  }

  console.log(err);
  res.status(errorCode).json({ message: errorMessage });
});

module.exports = app;
