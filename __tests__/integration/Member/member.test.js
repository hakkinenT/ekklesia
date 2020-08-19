const request = require("supertest");

const app = require("../../../src/app");
const factory = require("../../factories");

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

    const address = {
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
      genre: "masculino",
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
        ...address,
        church_name: church.name,
      });

    expect(response.status).toBe(200);

    done();
  });

  it("shouldn't register a member if the user who is registering does not have permission", async (done) => {
    const user = await factory.create("User", {
      username: "comum1",
      password: "12345678",
      permission: "comum",
    });

    const token = user.generateToken();

    const address_church = await factory.create("Address");

    const user_church = await factory.create("User", {
      username: "church1",
      password: "12345678",
      permission: "super",
    });

    const church = await factory.create("Church", {
      cnpj: "14739536000138",
      address_id: address_church.id,
      user_id: user_church.id,
    });

    const address = {
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
        ...address,

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

    const address = {
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
        ...address,
        church_name: church.name,
      });

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
      cnpj: "52854119000125",
      address_id: address_church.id,
      user_id: user_church.id,
    });

    const token = user_church.generateToken();

    const address = {
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
      genre: "masculino",
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
        ...address,
        church_name: "Igreja Universal do Reino de Deus",
      });

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
      .set("Authorization", `Bearer ${token}`)
      .send({
        church_name: church.name,
      });

    expect(response.status).toBe(200);

    done();
  });

  it("shouldn't list all registered members if the user requesting the list does not have permission", async (done) => {
    const user = await factory.create("User", {
      username: "comum1",
      password: "12345678",
      permission: "comum",
    });

    const token = user.generateToken();

    const address_church = await factory.create("Address");

    const user_church = await factory.create("User", {
      username: "church1",
      password: "12345678",
      permission: "super",
    });

    const church = await factory.create("Church", {
      cnpj: "28492550000194",
      address_id: address_church.id,
      user_id: user_church.id,
    });

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
      .set("Authorization", `Bearer ${token}`)
      .send({
        church_name: church.name,
      });

    expect(response.status).toBe(401);

    done();
  });

  it("should get a member by ID", async (done) => {
    const address_church = await factory.create("Address");

    const user_church = await factory.create("User", {
      username: "church1",
      password: "12345678",
      permission: "super",
    });

    const church = await factory.create("Church", {
      cnpj: "33834893000120",
      address_id: address_church.id,
      user_id: user_church.id,
    });

    const token = user_church.generateToken();

    const address1 = await factory.create("Address");
    const member = await factory.create("Member", {
      church_cnpj: church.cnpj,
      address_id: address1.id,
    });

    const response = await request(app)
      .get(`/member/${member.get().id}`)
      .set("Authorization", `Bearer ${token}`)
      .send({
        church_name: church.name,
      });

    expect(response.status).toBe(200);
    done();
  });

  it("should get a member if the user requesting the information does not have permission", async (done) => {
    const user = await factory.create("User", {
      username: "comum1",
      password: "12345678",
      permission: "comum",
    });

    const token = user.generateToken();

    const address_church = await factory.create("Address");

    const user_church = await factory.create("User", {
      username: "church1",
      password: "12345678",
      permission: "super",
    });

    const church = await factory.create("Church", {
      cnpj: "57670712000135",
      address_id: address_church.id,
      user_id: user_church.id,
    });

    const address1 = await factory.create("Address");
    const member = await factory.create("Member", {
      church_cnpj: church.cnpj,
      address_id: address1.id,
    });

    const response = await request(app)
      .get(`/member/${member.get().id}`)
      .set("Authorization", `Bearer ${token}`)
      .send({
        church_name: church.name,
      });

    expect(response.status).toBe(401);
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
      cnpj: "20824440000170",
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
      church_cnpj: church.cnpj,
      address_id: address1.id,
      user_id: user.id,
    });

    const token = user.generateToken();

    const address2 = await factory.create("Address");
    const member = await factory.create("Member", {
      church_cnpj: church.cnpj,
      address_id: address2.id,
    });

    const response = await request(app)
      .delete(`/member/${member.get().id}`)
      .set("Authorization", `Bearer ${token}`)
      .send({
        church_name: church.name,
      });
    //console.log(response);
    expect(response.status).toBe(200);

    done();
  });

  it("should delete a member if the user requesting the exclusion does not have permission", async (done) => {
    const address_church = await factory.create("Address");

    const user_church = await factory.create("User", {
      username: "church1",
      password: "12345678",
      permission: "super",
    });

    const church = await factory.create("Church", {
      cnpj: "59999390000106",
      address_id: address_church.id,
      user_id: user_church.id,
    });

    const user = await factory.create("User", {
      username: "admin1",
      password: "12345678",
      permission: "comum",
    });

    const address1 = await factory.create("Address");
    const member1 = await factory.create("Member", {
      church_cnpj: church.cnpj,
      address_id: address1.id,
      user_id: user.id,
    });

    const token = user.generateToken();

    const address2 = await factory.create("Address");
    const member = await factory.create("Member", {
      church_cnpj: church.cnpj,
      address_id: address2.id,
    });

    const response = await request(app)
      .delete(`/member/${member.get().id}`)
      .set("Authorization", `Bearer ${token}`)
      .send({
        church_name: church.name,
      });

    expect(response.status).toBe(401);

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
      cnpj: "41581591000115",
      address_id: address_church.id,
      user_id: user_church.id,
    });

    const user = await factory.create("User", {
      username: "admin2s",
      password: "12345678",
      permission: "admin",
    });

    const address1 = await factory.create("Address");
    await factory.create("Member", {
      church_cnpj: church.cnpj,
      address_id: address1.id,
      user_id: user.id,
    });

    const token = user.generateToken();

    const address = await factory.create("Address");
    const member = await factory.create("Member", {
      church_cnpj: church.cnpj,
      address_id: address.id,
    });

    member.name = "Alfredo Augusto";
    member.profession = "Engenheiro";
    member.save();

    address.address = "Avenida Marechal Rondon";
    address.save();

    const response = await request(app)
      .put(`/member/${member.get().id}`)
      .set("Authorization", `Bearer ${token}`)
      .send({
        member: member.get(),
        address: address.get(),
        church_name: church.name,
      });

    expect(response.status).toBe(200);

    done();
  });

  it("shouldn't update a member's information if the user requesting the update does not have permission", async (done) => {
    const address_church = await factory.create("Address");

    const user_church = await factory.create("User", {
      username: "church1",
      password: "12345678",
      permission: "super",
    });

    const church = await factory.create("Church", {
      cnpj: "98145194000118",
      address_id: address_church.id,
      user_id: user_church.id,
    });

    const user = await factory.create("User", {
      username: "admin1",
      password: "12345678",
      permission: "comum",
    });

    const address1 = await factory.create("Address");
    const member1 = await factory.create("Member", {
      church_cnpj: church.cnpj,
      address_id: address1.id,
      user_id: user.id,
    });

    const token = user.generateToken();

    const address2 = await factory.create("Address");
    const member = await factory.create("Member", {
      church_cnpj: church.cnpj,
      address_id: address2.id,
    });

    const response = await request(app)
      .put(`/member/${member.get().id}`)
      .set("Authorization", `Bearer ${token}`)
      .send({
        member: member.get(),
        address: address2.get(),
        church_name: church.name,
      });

    expect(response.status).toBe(401);

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
      cnpj: "85293599000151",
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
      church_cnpj: church.cnpj,
      address_id: address1.id,
      user_id: user.id,
    });

    const token = user.generateToken();

    const address2 = await factory.create("Address");
    const member = await factory.create("Member", {
      church_cnpj: church.cnpj,
      address_id: address2.id,
    });

    member.name = "   ";
    await member.save();

    const response = await request(app)
      .put(`/member/${member.get().id}`)
      .set("Authorization", `Bearer ${token}`)
      .send({
        member: member.get(),
        address: address2.get(),
        church_name: church.name,
      });

    expect(response.status).toBe(400);

    done();
  });
});
