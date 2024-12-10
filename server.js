require("dotenv").config();
const port = process.env.PORT || 5000;
const { client } = require("./database");

const app = require("./app");

client
  .connect()
  .then(() => {
    console.log("The database is connected");

    app.listen(port, () =>
      console.log("Server running on port http://localhost:" + port)
    );
  })
  .catch((err) => console.log("Error to connect to database\n" + err));
