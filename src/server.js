const app = require("./app");

module.exports = app.listen(3333 || process.env.PORT, () =>
  console.log("Rodando na porta 3333")
);
