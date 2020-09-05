const request = require("supertest");

const app = require("../../../src/app");
const factory = require("../../factories");
const { cnpj } = require("cpf-cnpj-validator");

describe("Church model", () => {
  it("should register a church", async (done) => {
    const church = {
      name: "Igreja Batista do Centenário",
      cnpj: "08133802000181",
      email: "igrejabatistadocentenario@hotmail.com",
      creation_date: "1980-08-19",
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

    const user = {
      password: "Thol567@",
    };

    const response = await request(app)
      .post("/church")
      .send({
        ...church,
        ...address,
        ...user,
      });

    expect(response.status).toBe(201);
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
      street: "     ",
      number: "1234$",
      neighborhood: "",
      zip_code: "4913000A",
      complement: "do lado da prefeitura",
      city: "   ",
      state: "",
    };

    const user = {
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
      street: "Rua Guarani",
      number: "1234",
      neighborhood: "centro",
      zip_code: "49130000",
      complement: "do lado da prefeitura",
      city: "riachuelo",
      state: "sergipe",
    };

    const user = {
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
      street: "Rua Guarani",
      number: "1234",
      neighborhood: "centro",
      zip_code: "49130000",
      complement: "do lado da prefeitura",
      city: "riachuelo",
      state: "sergipe",
    };

    const user = {
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

    const user = await factory.create("User", {
      username: "church0",
      permission: "super",
    });
    const church = await factory.create("Church", {
      cnpj: cnpj.generate(),
      address_id: address.id,
      user_id: user.id,
    });

    const token = user.generateToken();

    const response = await request(app)
      .get(`/church/${church.get().cnpj}`)
      .set("Authorization", `Bearer ${token}`);

    await address.destroy();
    await user.destroy();
    await church.destroy();

    expect(response.status).toBe(200);

    done();
  });

  it("shouldn't find a church if the CNPJ is invalid", async (done) => {
    const address = await factory.create("Address");

    const user = await factory.create("User", {
      username: "church1",
      permission: "super",
    });

    const church = await factory.create("Church", {
      cnpj: "33173763000193",
      address_id: address.id,
      user_id: user.id,
    });

    const token = user.generateToken();

    const response = await request(app)
      .get("/church/3947795500023")
      .set("Authorization", `Bearer ${token}`);

    await address.destroy();
    await user.destroy();
    await church.destroy();

    expect(response.status).toBe(400);

    done();
  });

  it("should return a church with your address", async (done) => {
    const address = await factory.create("Address");

    const user = await factory.create("User", {
      username: "church2",
      permission: "super",
    });

    const church = await factory.create("Church", {
      cnpj: cnpj.generate(),
      address_id: address.id,
      user_id: user.id,
    });

    const token = user.generateToken();

    const response = await request(app)
      .get(`/church/${church.get().cnpj}`)
      .set("Authorization", `Bearer ${token}`);

    await address.destroy();
    await user.destroy();
    await church.destroy();

    expect(response.body.Address.address).toBe(address.get().address);

    done();
  });

  it("should update a church's information", async (done) => {
    const address = await factory.create("Address");

    const user = await factory.create("User", {
      username: "church3",
      permission: "super",
    });

    const token = user.generateToken();

    const church = await factory.create("Church", {
      cnpj: cnpj.generate(),
      address_id: address.id,
      user_id: user.id,
    });

    church.name = "Igreja Batista do Centenário";
    church.save();

    address.address = "Avenida Marechal Rondon";
    address.save();

    const response = await request(app)
      .put(`/church/${church.get().cnpj}`)
      .set("Authorization", `Bearer ${token}`)
      .send({
        church: church.get(),
        address: address.get(),
      });

    await address.destroy();
    await user.destroy();
    await church.destroy();

    expect(response.status).toBe(200);

    done();
  });

  it("shouldn't update a church if the fields are empty strings", async (done) => {
    const address = await factory.create("Address");

    const user = await factory.create("User", {
      username: "church4",
      permission: "super",
    });
    const token = user.generateToken();

    const church = await factory.create("Church", {
      cnpj: cnpj.generate(),
      address_id: address.id,
      user_id: user.id,
    });

    church.name = "";
    church.save();

    address.address = "     ";
    address.save();

    const response = await request(app)
      .put(`/church/${church.get().cnpj}`)
      .set("Authorization", `Bearer ${token}`)
      .send({
        church: church.get(),
        address: address.get(),
      });

    await address.destroy();
    await user.destroy();
    await church.destroy();

    expect(response.status).toBe(400);

    done();
  });

  it("shouldn't update a church that was not found", async (done) => {
    const address = await factory.create("Address");

    const user = await factory.create("User", {
      username: "church5",
      permission: "super",
    });

    const token = user.generateToken();

    const church = await factory.create("Church", {
      cnpj: cnpj.generate(),
      address_id: address.id,
      user_id: user.id,
    });

    const response = await request(app)
      .put("/church/98126310000151")
      .set("Authorization", `Bearer ${token}`)
      .send({
        church: church.get(),
        address: address.get(),
      });

    await address.destroy();
    await user.destroy();
    await church.destroy();

    expect(response.status).toBe(404);

    done();
  });

  it("shouldn't update a church if the church's CNPJ is invalid", async (done) => {
    const address = await factory.create("Address");

    const user = await factory.create("User", {
      username: "church6",
      permission: "super",
    });

    const token = user.generateToken();

    const church = await factory.create("Church", {
      cnpj: cnpj.generate(),
      address_id: address.id,
      user_id: user.id,
    });

    const response = await request(app)
      .put("/church/305016460001")
      .set("Authorization", `Bearer ${token}`)
      .send({
        church: church.get(),
        address: address.get(),
      });

    await address.destroy();
    await user.destroy();
    await church.destroy();

    expect(response.status).toBe(400);
    done();
  });

  it("should delete a church", async (done) => {
    const address = await factory.create("Address");

    const user = await factory.create("User", {
      username: "church7",
      permission: "super",
    });

    const token = user.generateToken();

    const church = await factory.create("Church", {
      cnpj: cnpj.generate(),
      address_id: address.id,
      user_id: user.id,
    });

    const response = await request(app)
      .delete(`/church/${church.get().cnpj}`)
      .set("Authorization", `Bearer ${token}`);

    await address.destroy();
    await user.destroy();
    await church.destroy();

    expect(response.status).toBe(200);
    done();
  });

  it("shouldn't delete a church if the CNPJ is invalid", async (done) => {
    const address = await factory.create("Address");

    const user = await factory.create("User", {
      username: "church0",
      permission: "super",
    });

    const token = user.generateToken();

    const church = await factory.create("Church", {
      cnpj: cnpj.generate(),
      address_id: address.id,
      user_id: user.id,
    });

    const response = await request(app)
      .delete("/church/394065000100")
      .set("Authorization", `Bearer ${token}`);

    await address.destroy();
    await user.destroy();
    await church.destroy();

    expect(response.status).toBe(400);
    done();
  });
});
