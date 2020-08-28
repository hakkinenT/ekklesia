const { factory } = require("factory-girl");
const faker = require("faker/locale/pt_BR");
const { Church, Address, User, Member } = require("../src/app/models");

factory.define("Church", Church, {
  name: faker.company.companyName,
  cnpj: "10803785000194",
  email: faker.internet.email,
  creation_date: "1986-08-09",
});

factory.define("Address", Address, {
  street: faker.address.streetName,
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

factory.define("Member", Member, {
  name: faker.name.firstName,
  genre: "Masculino",
  date_of_birth: "1990-10-02",
  email: faker.internet.email,
  whatsapp: "79999999999",
  profession: faker.name.jobArea,
  conversion_date: "1996-01-08",
  baptism_date: "1997-01-20",
});

module.exports = factory;
