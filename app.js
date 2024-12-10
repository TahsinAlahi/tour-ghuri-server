require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");

app.use(cors());
app.use(express.json());

app.get("/", async (req, res) => {
  res.send("hello");
});

module.exports = app;
