const { factory } = require("factory-girl");
const faker = require("faker/locale/pt_BR");
const { Church, Address, User } = require("../src/app/models");

factory.define("Church", Church, {
  name: faker.company.companyName,
  cnpj: "10803785000194",
  email: faker.internet.email,
  creation_date: faker.date.past,
});

factory.define("Address", Address, {
  address: faker.address.streetName,
  number: faker.random.number({ min: 1, max: 5000 }),
  neighborhood: faker.address.county,
  zip_code: "49100000",
  complement: faker.random.words,
  city: faker.address.city,
  state: faker.address.state,
});

factory.define("User", User, {
  username: faker.internet.userName(),
  password: "Th@l1234",
});

module.exports = factory;
