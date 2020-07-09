const request = require("supertest");

const app = require("../../../src/app");
//const factory = require("../../factories");
//const { Address, Church } = require("../../../src/app/models");

describe("Church model", () => {
  it("should register a church", async (done) => {
    const church = {
      name: "igreja batista do centenário",
      cnpj: "08133802000181",
      creation_date: 19800819,
    };

    const address = {
      street: "Rua Guarani",
      number: "1234",
      neighborhood: "centro",
      zip_code: "49130000",
      complement: "do lado da prefeitura",
      city: "riachuelo",
      state: "sergipe",
    };

    const response = await request(app)
      .post("/church")
      .send({
        ...church,
        ...address,
      });

    expect(response.status).toBe(200);
    done();
  });

  it("shouldn't register a church", async (done) => {
    const church = {
      name: "igreja batista do centenário",
      cnpj: "08133802000181",
      creation_date: 19800819,
    };

    const address = {
      street: "Rua Guarani",
      number: "1234",
      neighborhood: "centro",
      zip_code: "49130000",
      complement: "do lado da prefeitura",
      city: "riachuelo",
      state: "sergipe",
    };

    const response = await request(app)
      .post("/church")
      .send({
        ...church,
        ...address,
      });

    expect(response.status).toBe(400);
    done();
  });

  it("shouldn't register a church if the CNPJ is invalid", async (done) => {
    const church = {
      name: "igreja batista do centenário",
      cnpj: "19937389300",
      creation_date: 19800819,
    };

    const address = {
      street: "Rua Guarani",
      number: "1234",
      neighborhood: "centro",
      zip_code: "49130000",
      complement: "do lado da prefeitura",
      city: "riachuelo",
      state: "sergipe",
    };

    const response = await request(app)
      .post("/church")
      .send({
        ...church,
        ...address,
      });

    expect(response.status).toBe(400);
    done();
  });
});
