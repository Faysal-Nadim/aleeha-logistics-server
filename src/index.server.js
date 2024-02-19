const express = require("express");
const env = require("dotenv");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

env.config();

mongoose
  .connect(
    `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@aleehalogistics.0omsyte.mongodb.net/?retryWrites=true&w=majority`,
    { dbName: "AleehaLogistics" }
  )
  .then(() => {
    console.log("Connected To Database");
  })
  .catch((err) => {
    console.log("Unable to connect" + err);
  });

app.use(cors());
app.options("*", cors());
app.use(express.json());

app.listen(process.env.PORT, () => {
  console.log(`Server Running On PORT ${process.env.PORT}`);
});
