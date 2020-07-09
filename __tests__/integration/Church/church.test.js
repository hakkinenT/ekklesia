const request = require("supertest");

const app = require("../../../src/app");
const factory = require("../../factories");
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

  it("shouldn't register a church if the CNPJ has already been registered", async (done) => {
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

  it("should find a church through CNPJ", async (done) => {
    const address = await factory.create("Address");
    const church = await factory.create("Church", {
      cnpj: "39477955000170",
      address_id: address.id,
    });

    const response = await request(app).get(`/church/${church.get().cnpj}`);

    expect(response.status).toBe(200);
    done();
  });

  it("should return a church with your address", async (done) => {
    const address = await factory.create("Address");
    const church = await factory.create("Church", {
      cnpj: "59415581000175",
      address_id: address.id,
    });

    const response = await request(app).get(`/church/${church.get().cnpj}`);

    expect(response.body.Address.street).toBe(address.get().street);
    done();
  });
});
