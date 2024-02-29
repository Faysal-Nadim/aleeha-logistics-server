const express = require("express");
const env = require("dotenv");
const mongoose = require("mongoose");
const cors = require("cors");

//App Initialization
const app = express();

//Environment Variable Initialization
env.config();

//Route Defination
const authRoute = require("./routes/user");
const productRoute = require("./routes/product");
const orderRoute = require("./routes/order");
const courierRoute = require("./routes/courier");
const addressRoute = require("./routes/address");
const disputeRoute = require("./routes/dispute");

//Database Initialization
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

//App Configuration
app.use(cors());
app.options("*", cors());
app.use(express.json());
app.use("/api/v1", authRoute);
app.use("/api/v1", productRoute);
app.use("/api/v1", orderRoute);
app.use("/api/v1", courierRoute);
app.use("/api/v1", addressRoute);
app.use("/api/v1", disputeRoute);

//Port Configuration
app.listen(process.env.PORT, () => {
  console.log(`Server Running On PORT ${process.env.PORT}`);
});
