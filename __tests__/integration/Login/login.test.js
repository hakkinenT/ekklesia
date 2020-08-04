const request = require("supertest");

const app = require("../../../src/app");

const factory = require("../../factories");

describe("Login", () => {
  it("should authenticate a church with valid credentials", async (done) => {
    const user = await factory.create("User", {
      username: "church",
      password: "12345678",
      permission: "super",
    });
    const address_church = await factory.create("Address");
    const church = await factory.create("Church", {
      address_id: address_church.id,
      user_id: user.id,
    });

    const response = await request(app).post("/login").send({
      email: church.email,
      password: "12345678",
    });

    expect(response.status).toBe(200);

    done();
  });

  it("shouldn't authenticate a church with invalid password", async (done) => {
    const user = await factory.create("User", {
      username: "church234",
      password: "12345679",
      permission: "super",
    });
    const address_church = await factory.create("Address");
    const church = await factory.create("Church", {
      cnpj: "20070795000111",
      address_id: address_church.id,
      user_id: user.id,
    });

    const response = await request(app).post("/login").send({
      email: church.email,
      password: "14568912",
    });

    expect(response.status).toBe(401);

    done();
  });

  it("shouldn't authenticate a church with invalid email", async (done) => {
    const user = await factory.create("User", {
      username: "church234p",
      password: "12345679",
      permission: "super",
    });
    const address_church = await factory.create("Address");
    const church = await factory.create("Church", {
      email: "email@email.com",
      cnpj: "10596004000138",
      address_id: address_church.id,
      user_id: user.id,
    });

    const response = await request(app).post("/login").send({
      email: "email@church.com",
      password: "12345679",
    });

    expect(response.status).toBe(401);

    done();
  });

  it("should return a jwt token when a church is authenticated", async (done) => {
    const user = await factory.create("User", {
      username: "church234rp",
      password: "12345679",
      permission: "super",
    });
    const address_church = await factory.create("Address");
    const church = await factory.create("Church", {
      email: "email@email.com",
      cnpj: "48765249000114",
      address_id: address_church.id,
      user_id: user.id,
    });

    const response = await request(app).post("/login").send({
      email: church.email,
      password: "12345679",
    });

    expect(response.body).toHaveProperty("token");

    done();
  });

  it("should authenticate a member with valid credentials", async (done) => {
    const user_church = await factory.create("User", {
      username: "church_test",
      password: "12345679",
      permission: "super",
    });
    const address_church = await factory.create("Address");
    const church = await factory.create("Church", {
      cnpj: "44426498000124",
      address_id: address_church.id,
      user_id: user_church.id,
    });
    const user = await factory.create("User", {
      username: "member",
      password: "12345678",
      permission: "admin",
    });
    const address_member = await factory.create("Address");

    const member = await factory.create("Member", {
      church_cnpj: church.cnpj,
      address_id: address_member.id,
      user_id: user.id,
    });

    const response = await request(app).post("/login").send({
      email: member.email,
      password: "12345678",
    });

    expect(response.status).toBe(200);

    done();
  });

  it("shouldn't authenticate a member with invalid password", async (done) => {
    const user_church = await factory.create("User", {
      username: "church_test2",
      password: "12345679",
      permission: "super",
    });
    const address_church = await factory.create("Address");
    const church = await factory.create("Church", {
      cnpj: "55791393000190",
      address_id: address_church.id,
      user_id: user_church.id,
    });

    const user = await factory.create("User", {
      username: "member23475",
      password: "12345679",
    });
    const address_member = await factory.create("Address");
    const member = await factory.create("Member", {
      church_cnpj: church.cnpj,
      address_id: address_member.id,
      user_id: user.id,
    });

    const response = await request(app).post("/login").send({
      email: member.email,
      password: "14568912",
    });

    expect(response.status).toBe(401);

    done();
  });

  it("shouldn't authenticate a member with invalid email", async (done) => {
    const user_church = await factory.create("User", {
      username: "church_tester2",
      password: "12345099",
      permission: "super",
    });
    const address_church = await factory.create("Address");
    const church = await factory.create("Church", {
      cnpj: "90382830000113",
      address_id: address_church.id,
      user_id: user_church.id,
    });

    const user = await factory.create("User", {
      username: "member23475opn",
      password: "12345679",
    });
    const address_member = await factory.create("Address");
    const member = await factory.create("Member", {
      email: "email_member@email.com",
      church_cnpj: church.cnpj,
      address_id: address_member.id,
      user_id: user.id,
    });

    const response = await request(app).post("/login").send({
      email: "email@member.com",
      password: "12345679",
    });

    expect(response.status).toBe(401);

    done();
  });

  it("should return a jwt token when a member is authenticated", async (done) => {
    const user_church = await factory.create("User", {
      username: "church_tester32",
      password: "12345099",
      permission: "super",
    });
    const address_church = await factory.create("Address");
    const church = await factory.create("Church", {
      cnpj: "44666605000191",
      address_id: address_church.id,
      user_id: user_church.id,
    });

    const user = await factory.create("User", {
      username: "member23475kmln",
      password: "12345679",
    });
    const address_member = await factory.create("Address");
    const member = await factory.create("Member", {
      email: "email@member.com",
      church_cnpj: church.cnpj,
      address_id: address_member.id,
      user_id: user.id,
    });

    const response = await request(app).post("/login").send({
      email: "email@member.com",
      password: "12345679",
    });
    expect(response.body).toHaveProperty("token");

    done();
  });
});
