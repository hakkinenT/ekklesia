const request = require("supertest");

const app = require("../../../src/app");
const factory = require("../../factories");
const { internet } = require("faker/lib/locales/pt_BR");

describe("Member model", () => {
  it("should register a member", async (done) => {
    const address_church = await factory.create("Address");

    const user_church = await factory.create("User", {
      username: "church1",
      password: "12345678",
      permission: "super",
    });

    const church = await factory.create("Church", {
      cnpj: "32803833000187",
      address_id: address_church.id,
      user_id: user_church.id,
    });

    const token = user_church.generateToken();

    const address_member = {
      address: "Rua Guarani",
      number: "1234",
      neighborhood: "centro",
      zip_code: "49130000",
      complement: "do lado da prefeitura",
      city: "riachuelo",
      state: "sergipe",
    };

    const member = {
      name: "Augusto da Silva",
      genre: "maculino",
      date_of_birth: "1990-10-02",
      email: "augustosilva@hotmail.com",
      whatsapp: "79999999999",
      profession: "professor",
      conversion_date: "1996-01-08",
      baptism_date: "1997-01-20",
    };

    const response = await request(app)
      .post("/member")
      .set("Authorization", `Bearer ${token}`)
      .send({
        ...member,
        ...address_member,
        church_name: church.name,
      });
    //console.log(response);
    expect(response.status).toBe(200);

    done();
  });

  it("shouldn't register a member if the user who is registering does not have permission", async (done) => {
    const address_church = await factory.create("Address");

    const user_church = await factory.create("User", {
      username: "church1",
      password: "12345678",
      permission: "comum",
    });

    const church = await factory.create("Church", {
      cnpj: "14739536000138",
      address_id: address_church.id,
      user_id: user_church.id,
    });

    const token = user_church.generateToken();

    const address_member = {
      address: "Rua Guarani",
      number: "1234",
      neighborhood: "centro",
      zip_code: "49130000",
      complement: "do lado da prefeitura",
      city: "riachuelo",
      state: "sergipe",
    };

    const member = {
      name: "Augusto da Silva",
      genre: "maculino",
      date_of_birth: "1990-10-02",
      email: "augustosilva@hotmail.com",
      whatsapp: "79999999999",
      profession: "professor",
      conversion_date: "1996-01-08",
      baptism_date: "1997-01-20",
    };

    const response = await request(app)
      .post("/member")
      .set("Authorization", `Bearer ${token}`)
      .send({
        ...member,
        ...address_member,
        church_name: church.name,
      });

    expect(response.status).toBe(401);

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
      cnpj: "92530915000127",
      address_id: address_church.id,
      user_id: user_church.id,
    });

    const token = user_church.generateToken();

    const address_member = {
      address: "Rua Guarani",
      number: "1234",
      neighborhood: "centro",
      zip_code: "49130000",
      complement: "do lado da prefeitura",
      city: "riachuelo",
      state: "sergipe",
    };

    const member = {
      name: "Augusto da Silva",
      genre: "         ",
      date_of_birth: "1990-10-02",
      email: "augustosilva@hotmail.com",
      whatsapp: "79999999999",
      profession: "professor",
      conversion_date: "1996-01-08",
      baptism_date: "1997-01-20",
    };

    const response = await request(app)
      .post("/member")
      .set("Authorization", `Bearer ${token}`)
      .send({
        ...member,
        ...address_member,
        church_name: church.name,
      });

    expect(response.status).toBe(400);

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
      cnpj: "52777535000177",
      address_id: address_church.id,
      user_id: user_church.id,
    });

    const token = user_church.generateToken();

    const address1 = await factory.create("Address");
    await factory.create("Member", {
      church_cnpj: church.cnpj,
      address_id: address1.id,
    });

    const address2 = await factory.create("Address");
    await factory.create("Member", {
      church_cnpj: church.cnpj,
      address_id: address2.id,
    });

    const response = await request(app)
      .get("/members")
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(200);

    done();
  });

  it("shouldn't list all registered members if the user requesting the list does not have permission", async (done) => {
    const address_church = await factory.create("Address");

    const user_church = await factory.create("User", {
      username: "church1",
      password: "12345678",
      permission: "comum",
    });

    const church = await factory.create("Church", {
      cnpj: "28492550000194",
      address_id: address_church.id,
      user_id: user_church.id,
    });

    const token = user_church.generateToken();

    const address1 = await factory.create("Address");
    await factory.create("Member", {
      church_cnpj: church.cnpj,
      address_id: address1.id,
    });

    const address2 = await factory.create("Address");
    await factory.create("Member", {
      church_cnpj: church.cnpj,
      address_id: address2.id,
    });

    const response = await request(app)
      .get("/members")
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(401);

    done();
  });
});
