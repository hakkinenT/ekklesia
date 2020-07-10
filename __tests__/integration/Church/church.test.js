const request = require("supertest");

const app = require("../../../src/app");
const factory = require("../../factories");

describe("Church model", () => {
  it("should register a church", async (done) => {
    const church = {
      name: "igreja batista do centenário",
      cnpj: "08133802000181",
      creation_date: 19800819,
    };

    const address = {
      address: "Rua Guarani",
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

  it("shouldn't register a address when there is a validation error in the church registration", async (done) => {
    const church = {
      name: "igreja batista do centenário",
      cnpj: "08133802000181",
      creation_date: 19800819,
    };

    const address = {
      address: "Rua Guarani",
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
      address: "Rua Guarani",
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

    expect(response.body.Address.address).toBe(address.get().address);
    done();
  });

  it("should update a church's information", async (done) => {
    const address = await factory.create("Address");
    const church = await factory.create("Church", {
      cnpj: "09997950000107",
      address_id: address.id,
    });

    const response = await request(app)
      .put(`/church/${church.get().cnpj}`)
      .send({
        name: "Igreja Batista do Centenário",
        cnpj: church.cnpj,
        creation_date: church.creation_date,
        address: address.address,
        number: address.number,
        neighborhood: address.neighborhood,
        zip_code: address.zip_code,
        complement: address.complement,
        city: "Riachuelo",
        state: address.state,
      });

    expect(response.status).toBe(200);
    done();
  });

  it("shouldn't update an address of a church that was not found", async (done) => {
    const address = await factory.create("Address");
    const church = await factory.create("Church", {
      cnpj: "02505670000195",
      address_id: address.id,
    });

    const response = await request(app).put("/church/02505670000190").send({
      name: "Igreja Batista do Centenário",
      cnpj: church.cnpj,
      creation_date: church.creation_date,
      address: address.address,
      number: address.number,
      neighborhood: address.neighborhood,
      zip_code: address.zip_code,
      complement: address.complement,
      city: "Riachuelo",
      state: address.state,
    });

    expect(response.status).toBe(400);
    done();
  });

  it("shouldn't update an address if the church's CNPJ is invalid", async (done) => {
    const address = await factory.create("Address");
    const church = await factory.create("Church", {
      cnpj: "30501646000113",
      address_id: address.id,
    });

    const response = await request(app).put("/church/305016460001").send({
      name: "Igreja Batista do Centenário",
      cnpj: church.cnpj,
      creation_date: church.creation_date,
      address: address.address,
      number: address.number,
      neighborhood: address.neighborhood,
      zip_code: address.zip_code,
      complement: address.complement,
      city: "Riachuelo",
      state: address.state,
    });

    expect(response.status).toBe(400);
    done();
  });
});
