require("dotenv").config({
  path: process.env.NODE_ENV === "test" ? ".env.test" : ".env",
});

const express = require("express");
const cors = require("cors");
const swaggerUi = require("swagger-ui-express");

const swaggerDocument = require("../doc/swagger");
const churchRouter = require("./app/modules/Church/ChurchRouter");
const userRouter = require("./app/modules/User/UserRouter");
const loginRouter = require("./app/modules/Login/LoginRouter");

const app = express();

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/doc", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.get("/", (req, res) => {
  return res.send("Hello world");
});

app.use(loginRouter());
app.use(churchRouter());
app.use(userRouter());

module.exports = app;
