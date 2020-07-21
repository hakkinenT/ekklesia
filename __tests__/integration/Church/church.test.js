const request = require("supertest");

const app = require("../../../src/app");
const factory = require("../../factories");

describe("Church model", () => {
  it("should register a church", async (done) => {
    const church = {
      name: "Igreja Batista do Centenário",
      cnpj: "08133802000181",
      email: "igrejabatistadocentenario@hotmail.com",
      creation_date: "1980-08-19",
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

    const user = {
      username: "tholhakk",
      password: "Thol567@",
    };

    const response = await request(app)
      .post("/church")
      .send({
        ...church,
        ...address,
        ...user,
      });

    //console.log(response);
    expect(response.status).toBe(200);
    done();
  });

  it("shouldn't register a church if there are invalid fields", async (done) => {
    const church = {
      name: "    ",
      cnpj: "08133802000181",
      email: "igrejabatistadocentenario",
      creation_date: "1980-08-19",
    };

    const address = {
      address: "     ",
      number: "1234$",
      neighborhood: "",
      zip_code: "4913000A",
      complement: "do lado da prefeitura",
      city: "   ",
      state: "",
    };

    const user = {
      username: "superman",
      password: "12345678",
    };

    const response = await request(app)
      .post("/church")
      .send({
        ...church,
        ...address,
        ...user,
      });

    expect(response.status).toBe(400);
    done();
  });

  it("shouldn't register a church if the CNPJ is invalid", async (done) => {
    const church = {
      name: "igreja batista do centenário",
      cnpj: "19937389300",
      creation_date: "1980-08-19",
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

    const user = {
      username: "superman",
      password: "Tab@5678",
    };

    const response = await request(app)
      .post("/church")
      .send({
        ...church,
        ...address,
        ...user,
      });

    expect(response.status).toBe(400);
    done();
  });

  it("shouldn't register a church if it already exists", async (done) => {
    const church = {
      name: "igreja batista do centenário",
      cnpj: "08133802000181",
      creation_date: "1980-08-19",
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

    const user = {
      username: "superman",
      password: "Tab@5678",
    };

    const response = await request(app)
      .post("/church")
      .send({
        ...church,
        ...address,
        ...user,
      });

    expect(response.status).toBe(400);
    done();
  });

  it("should find a church through CNPJ", async (done) => {
    const address = await factory.create("Address");

    const user = await factory.create("User");

    const church = await factory.create("Church", {
      cnpj: "39477955000170",
      address_id: address.id,
      user_id: user.id,
    });

    const response = await request(app).get(`/church/${church.get().cnpj}`);

    expect(response.status).toBe(200);
    done();
  });

  it("shouldn't find a church if the CNPJ is invalid", async (done) => {
    const address = await factory.create("Address");

    const user = await factory.create("User");

    const church = await factory.create("Church", {
      cnpj: "33173763000193",
      address_id: address.id,
      user_id: user.id,
    });

    const response = await request(app).get("/church/3947795500023");
    expect(response.status).toBe(400);
    done();
  });

  it("should return a church with your address", async (done) => {
    const address = await factory.create("Address");

    const user = await factory.create("User");

    const church = await factory.create("Church", {
      cnpj: "59415581000175",
      address_id: address.id,
      user_id: user.id,
    });

    const response = await request(app).get(`/church/${church.get().cnpj}`);

    expect(response.body.Address.address).toBe(address.get().address);
    done();
  });

  it("should update a church's information", async (done) => {
    const address = await factory.create("Address");

    const user = await factory.create("User");

    const church = await factory.create("Church", {
      cnpj: "09997950000107",
      address_id: address.id,
      user_id: user.id,
    });

    const response = await request(app)
      .put(`/church/${church.get().cnpj}`)
      .send({
        name: "Igreja Batista do Centenário",
        cnpj: church.cnpj,
        creation_date: church.creation_date,
        email: "igreja@hotmail.com",
        address: address.address,
        zip_code: "49130000",
        complement: address.complement,
        city: "Riachuelo",
        state: address.state,
      });

    expect(response.status).toBe(200);
    done();
  });

  it("shouldn't update a church if the fields are empty strings", async (done) => {
    const address = await factory.create("Address");

    const user = await factory.create("User");

    const church = await factory.create("Church", {
      cnpj: "40754683000197",
      address_id: address.id,
      user_id: user.id,
    });

    const response = await request(app)
      .put(`/church/${church.get().cnpj}`)
      .send({
        name: "",
        cnpj: church.cnpj,
        creation_date: church.creation_date,
        email: "igreja@hotmail.com",
        address: address.address,
        zip_code: "49130000",
        complement: address.complement,
        city: "     ",
        state: address.state,
      });

    expect(response.status).toBe(400);
    done();
  });

  it("shouldn't update a church that was not found", async (done) => {
    const address = await factory.create("Address");

    const user = await factory.create("User");

    const church = await factory.create("Church", {
      cnpj: "02505670000195",
      address_id: address.id,
      user_id: user.id,
    });

    const response = await request(app).put("/church/98126310000151").send({
      name: "Igreja Batista do Centenário",
      cnpj: church.cnpj,
      creation_date: church.creation_date,
      address: "Rua Laranjeiras",
      number: "12345",
      neighborhood: "Centro",
      zip_code: "49130000",
      complement: address.complement,
      city: "Riachuelo",
      state: "Sergipe",
    });

    expect(response.status).toBe(404);

    done();
  });

  it("shouldn't update a church if the church's CNPJ is invalid", async (done) => {
    const address = await factory.create("Address");

    const user = await factory.create("User");

    const church = await factory.create("Church", {
      cnpj: "30501646000113",
      address_id: address.id,
      user_id: user.id,
    });

    const response = await request(app).put("/church/305016460001").send({
      name: "Igreja Batista do Centenário",
      cnpj: church.cnpj,
      creation_date: church.creation_date,
      address: address.address,
      number: "1234",
      neighborhood: "Centro",
      zip_code: "49130000",
      complement: address.complement,
      city: "Riachuelo",
      state: address.state,
    });

    expect(response.status).toBe(400);
    done();
  });

  it("should delete a church", async (done) => {
    const address = await factory.create("Address");

    const user = await factory.create("User");

    const church = await factory.create("Church", {
      cnpj: "52652407000105",
      address_id: address.id,
      user_id: user.id,
    });

    const response = await request(app).delete(`/church/${church.get().cnpj}`);

    expect(response.status).toBe(200);
    done();
  });

  it("shouldn't delete a church if the CNPJ is invalid", async (done) => {
    const address = await factory.create("Address");

    const user = await factory.create("User");

    const church = await factory.create("Church", {
      cnpj: "39401165000100",
      address_id: address.id,
      user_id: user.id,
    });

    const response = await request(app).delete("/church/394065000100");

    expect(response.status).toBe(400);
    done();
  });
});
