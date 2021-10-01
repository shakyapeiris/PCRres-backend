const express = require("express");
const app = express();

const bodyParser = require("body-parser");
app.use(bodyParser.json());

const cors = require("cors");
app.use(cors());

const dotenv = require("dotenv");
dotenv.config();

const mongoose = require("mongoose");

const userRoutes = require("./routes/user-routes");
app.use("/user", userRoutes);

const adminRoutes = require("./routes/admin-routes");
app.use("/admin", adminRoutes);

mongoose
  .connect(
    "mongodb+srv://Shakya:pu57qxDMYvZybkVR@cluster0.smmeh.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => {
    console.log("Database Connected!");
  })
  .catch(console.log);

app.listen(process.env.PORT || 5000, () => {
  console.log("App Started");
});

module.exports = app;
