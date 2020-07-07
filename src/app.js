const express = require("express");
const swaggerUi = require("swagger-ui-express");

const swaggerDocument = require("../doc/swagger");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/doc", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.get("/", (req, res) => {
  return res.send("Hello world");
});

module.exports = app;
