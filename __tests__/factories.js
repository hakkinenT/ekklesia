const { factory } = require("factory-girl");
const faker = require("faker");
const { Church, Address, User } = require("../src/app/models");

factory.define("Church", Church, {
  name: faker.company.companyName,
  cnpj: "10803785000194",
  creation_date: faker.date.past,
});

factory.define("Address", Address, {
  address: faker.address.streetName,
  number: faker.random.alphaNumeric,
  neighborhood: faker.address.county,
  zip_code: faker.address.zipCode,
  complement: faker.random.words,
  city: faker.address.city,
  state: faker.address.state,
});

factory.define("User", User, {
  username: faker.internet.userName,
  password: faker.internet.password,
});

module.exports = factory;
