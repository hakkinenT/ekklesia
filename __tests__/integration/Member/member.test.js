const request = require("supertest");

const app = require("../../../src/app");
const factory = require("../../factories");
const { cpf, cnpj } = require("cpf-cnpj-validator");

describe("Member model", () => {
  it("should register a member", async (done) => {
    const address_church = await factory.create("Address");

    const user_church = await factory.create("User", {
      username: "church1",
      password: "12345678",
      permission: "super",
    });

    const church = await factory.create("Church", {
      name: "Igreja Batista da Lagoinha",
      cnpj: cnpj.generate(),
      address_id: address_church.id,
      user_id: user_church.id,
    });

    const token = user_church.generateToken();

    const address = {
      street: "Rua Guarani",
      number: "1234",
      neighborhood: "centro",
      zip_code: "49130000",
      complement: "do lado da prefeitura",
      city: "riachuelo",
      state: "sergipe",
    };

    const member = {
      name: "Augusto da Silva",
      cpf: cpf.generate(),
      genre: "Masculino",
      age: 27,
      date_of_birth: "1990-10-02",
      email: "augustosilva@hotmail.com",
      whatsapp: "79999999999",
      profession: "professor",
      conversion_date: "1996-01-08",
      baptism_date: "1997-01-20",
    };

    const response = await request(app)
      .post(`/member?church_name=${church.get().name}`)
      .set("Authorization", `Bearer ${token}`)
      .send({
        ...member,
        ...address,
      });

    await address_church.destroy();
    await user_church.destroy();
    await church.destroy();

    expect(response.status).toBe(201);

    done();
  });

  it("shouldn't register a member if there is an error in data validation", async (done) => {
    const address_church = await factory.create("Address");

    const user_church = await factory.create("User", {
      username: "church1",
      password: "12345678",
      permission: "super",
    });

    const church = await factory.create("Church", {
      cnpj: cnpj.generate(),
      address_id: address_church.id,
      user_id: user_church.id,
    });

    const token = user_church.generateToken();

    const address = {
      street: "Rua Guarani",
      number: "1234",
      neighborhood: "centro",
      zip_code: "49130000",
      complement: "do lado da prefeitura",
      city: "riachuelo",
      state: "sergipe",
    };

    const member = {
      name: "Augusto da Silva",
      cpf: "09876789098", //cpf invalido
      genre: "         ",
      age: 27,
      date_of_birth: "1990-10-02",
      email: "augustosilva@hotmail.com",
      whatsapp: "79999999999",
      profession: "professor",
      conversion_date: "1996-01-08",
      baptism_date: "1997-01-20",
    };

    const response = await request(app)
      .post(`/member?church_name=${church.get().name}`)
      .set("Authorization", `Bearer ${token}`)
      .send({
        ...member,
        ...address,
      });

    await address_church.destroy();
    await user_church.destroy();
    await church.destroy();

    expect(response.status).toBe(400);

    done();
  });

  it("shouldn't register a member if the church does not exist", async (done) => {
    const address_church = await factory.create("Address");

    const user_church = await factory.create("User", {
      username: "church1",
      password: "12345678",
      permission: "super",
    });

    const church = await factory.create("Church", {
      cnpj: cnpj.generate(),
      address_id: address_church.id,
      user_id: user_church.id,
    });

    const token = user_church.generateToken();

    const address = {
      street: "Rua Guarani",
      number: "1234",
      neighborhood: "centro",
      zip_code: "49130000",
      complement: "do lado da prefeitura",
      city: "riachuelo",
      state: "sergipe",
    };

    const member = {
      name: "Augusto da Silva",
      cpf: cpf.generate(),
      genre: "Masculino",
      age: 27,
      date_of_birth: "1990-10-02",
      email: "augustosilva@hotmail.com",
      whatsapp: "79999999999",
      profession: "professor",
      conversion_date: "1996-01-08",
      baptism_date: "1997-01-20",
    };

    const response = await request(app)
      .post(`/member?church_name=Igreja Assembleia dos anjos`)
      .set("Authorization", `Bearer ${token}`)
      .send({
        ...member,
        ...address,
      });

    await address_church.destroy();
    await user_church.destroy();
    await church.destroy();

    expect(response.status).toBe(404);

    done();
  });

  it("should list all registered members", async (done) => {
    const address_church = await factory.create("Address");

    const user_church = await factory.create("User", {
      username: "church1",
      password: "12345678",
      permission: "super",
    });

    const church = await factory.create("Church", {
      cnpj: cnpj.generate(),
      address_id: address_church.id,
      user_id: user_church.id,
    });

    const token = user_church.generateToken();

    const address1 = await factory.create("Address");
    const member = await factory.create("Member", {
      cpf: cpf.generate(),
      church_cnpj: church.cnpj,
      address_id: address1.id,
    });

    const address2 = await factory.create("Address");
    const member1 = await factory.create("Member", {
      cpf: "33693974047",
      church_cnpj: church.cnpj,
      address_id: address2.id,
    });

    const response = await request(app)
      .get(`/members?church_name=${church.get().name}`)
      .set("Authorization", `Bearer ${token}`);

    await address_church.destroy();
    await user_church.destroy();
    await church.destroy();
    await member.destroy();
    await member1.destroy();

    expect(response.status).toBe(200);

    done();
  });

  it("should get a member by CPF", async (done) => {
    const address_church = await factory.create("Address");

    const user_church = await factory.create("User", {
      username: "church1",
      password: "12345678",
      permission: "super",
    });

    const church = await factory.create("Church", {
      cnpj: cnpj.generate(),
      address_id: address_church.id,
      user_id: user_church.id,
    });

    const token = user_church.generateToken();

    const address1 = await factory.create("Address");
    const member = await factory.create("Member", {
      cpf: cpf.generate(),
      church_cnpj: church.cnpj,
      address_id: address1.id,
    });

    const response = await request(app)
      .get(`/member/${member.get().cpf}?church_name=${church.get().name}`)
      .set("Authorization", `Bearer ${token}`);

    await address_church.destroy();
    await user_church.destroy();
    await church.destroy();
    await member.destroy();

    expect(response.status).toBe(200);
    done();
  });

  it("should delete a member", async (done) => {
    const address_church = await factory.create("Address");

    const user_church = await factory.create("User", {
      username: "church1",
      password: "12345678",
      permission: "super",
    });

    const church = await factory.create("Church", {
      cnpj: cnpj.generate(),
      address_id: address_church.id,
      user_id: user_church.id,
    });

    const user = await factory.create("User", {
      username: "admin1",
      password: "12345678",
      permission: "admin",
    });

    const address1 = await factory.create("Address");
    const member1 = await factory.create("Member", {
      cpf: cpf.generate(),
      church_cnpj: church.cnpj,
      address_id: address1.id,
      user_id: user.id,
    });

    const token = user.generateToken();

    const address2 = await factory.create("Address");
    const member = await factory.create("Member", {
      cpf: cpf.generate(),
      church_cnpj: church.cnpj,
      address_id: address2.id,
    });

    const response = await request(app)
      .delete(`/member/${member.get().cpf}?church_name=${church.get().name}`)
      .set("Authorization", `Bearer ${token}`);

    await address_church.destroy();
    await user_church.destroy();
    await church.destroy();
    await address1.destroy();
    await member.destroy();
    await member1.destroy();

    expect(response.status).toBe(200);

    done();
  });

  it("should update a member's information", async (done) => {
    const address_church = await factory.create("Address");

    const user_church = await factory.create("User", {
      username: "church1",
      password: "12345678",
      permission: "super",
    });

    const church = await factory.create("Church", {
      cnpj: cnpj.generate(),
      address_id: address_church.id,
      user_id: user_church.id,
    });

    const user = await factory.create("User", {
      username: "admin2s",
      password: "12345678",
      permission: "admin",
    });

    const address1 = await factory.create("Address");
    const member1 = await factory.create("Member", {
      cpf: cpf.generate(),
      church_cnpj: church.cnpj,
      address_id: address1.id,
      user_id: user.id,
    });

    const token = user.generateToken();

    const address = await factory.create("Address");
    const member = await factory.create("Member", {
      cpf: cpf.generate(),
      church_cnpj: church.cnpj,
      address_id: address.id,
    });

    member.name = "Alfredo Augusto";
    member.profession = "Engenheiro";
    member.save();

    address.address = "Avenida Marechal Rondon";
    address.save();

    const response = await request(app)
      .put(`/member/${member.get().cpf}?church_name=${church.get().name}`)
      .set("Authorization", `Bearer ${token}`)
      .send({
        member: member.get(),
        address: address.get(),
      });

    await address_church.destroy();
    await user_church.destroy();
    await church.destroy();
    await address1.destroy();
    await member.destroy();
    await member1.destroy();

    expect(response.status).toBe(200);

    done();
  });

  it("shouldn't update a member's information if any information is invalid", async (done) => {
    const address_church = await factory.create("Address");

    const user_church = await factory.create("User", {
      username: "church1",
      password: "12345678",
      permission: "super",
    });

    const church = await factory.create("Church", {
      cnpj: cnpj.generate(),
      address_id: address_church.id,
      user_id: user_church.id,
    });

    const user = await factory.create("User", {
      username: "admin1",
      password: "12345678",
      permission: "admin",
    });

    const address1 = await factory.create("Address");
    const member1 = await factory.create("Member", {
      cpf: cpf.generate(),
      church_cnpj: church.cnpj,
      address_id: address1.id,
      user_id: user.id,
    });

    const token = user.generateToken();

    const address2 = await factory.create("Address");
    const member = await factory.create("Member", {
      cpf: cpf.generate(),
      church_cnpj: church.cnpj,
      address_id: address2.id,
    });

    member.name = "   ";
    await member.save();

    const response = await request(app)
      .put(`/member/${member.get().cpf}?church_name=${church.get().name}`)
      .set("Authorization", `Bearer ${token}`)
      .send({
        member: member.get(),
        address: address2.get(),
      });

    await address_church.destroy();
    await user_church.destroy();
    await church.destroy();
    await address1.destroy();
    await member.destroy();
    await member1.destroy();

    expect(response.status).toBe(400);

    done();
  });
});
