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
const memberRouter = require("./app/modules/Member/MemberRouter");
const searchFilterRouter = require("./app/modules/SearchFilter/SearchFilterRouter");

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
app.use(memberRouter());
app.use(searchFilterRouter());

module.exports = app;
