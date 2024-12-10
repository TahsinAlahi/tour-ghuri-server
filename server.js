require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const port = process.env.PORT || 5000;
const { client } = require("./database");

app.use(cors());
app.use(express.json());

app.get("/", async (req, res) => {
  res.send("hello");
});

client
  .connect()
  .then(() => {
    console.log("The database is connected");

    app.listen(port, () =>
      console.log("Server running on port http://localhost:" + port)
    );
  })
  .catch((err) => console.log("Error to connect to database\n" + err));
