const request = require("supertest");

const app = require("../../../src/app");
const factory = require("../../factories");
const { cpf, cnpj } = require("cpf-cnpj-validator");

describe("User module", () => {
  it("should register a user", async (done) => {
    const userChurch = await factory.create("User", {
      username: "church0",
      password: "Ibab$391",
      permission: "super",
    });

    const address_church = await factory.create("Address");

    const church = await factory.create("Church", {
      cnpj: cnpj.generate(),
      address_id: address_church.id,
      user_id: userChurch.id,
    });

    const token = userChurch.generateToken();

    const address = await factory.create("Address");
    const member = await factory.create("Member", {
      cpf: cpf.generate(),
      church_cnpj: church.cnpj,
      address_id: address.id,
    });

    const user = {
      password: "Th@l1802",
      permission: "admin",
    };

    const response = await request(app)
      .post(`/user?church_name=${church.get().name}`)
      .set("Authorization", `Bearer ${token}`)
      .send({ ...user, cpf: member.cpf });

    await userChurch.destroy();
    await address_church.destroy();
    await church.destroy();
    await address.destroy();
    await member.destroy();

    expect(response.status).toBe(201);

    done();
  });

  it("shouldn't register a user without a token", async (done) => {
    const userChurch = await factory.create("User", {
      username: "church1",
      password: "Ibab$391",
      permission: "super",
    });

    const address_church = await factory.create("Address");

    const church = await factory.create("Church", {
      cnpj: cnpj.generate(),
      address_id: address_church.id,
      user_id: userChurch.id,
    });

    const address = await factory.create("Address");
    const member = await factory.create("Member", {
      cpf: cpf.generate(),
      church_cnpj: church.cnpj,
      address_id: address.id,
    });

    const user = {
      password: "Tb@12e90",
      permission: "admin",
    };

    const response = await request(app)
      .post(`/user?church_name=${church.get().name}`)
      .send({ ...user, cpf: member.cpf });

    await userChurch.destroy();
    await address_church.destroy();
    await church.destroy();
    await address.destroy();
    await member.destroy();

    expect(response.status).toBe(401);

    done();
  });

  it("shouldn't register a user if the jwt token is invalid", async (done) => {
    const userChurch = await factory.create("User", {
      username: "church3",
      password: "Ibab$391",
      permission: "super",
    });

    const address_church = await factory.create("Address");

    const church = await factory.create("Church", {
      cnpj: cnpj.generate(),
      address_id: address_church.id,
      user_id: userChurch.id,
    });

    const address = await factory.create("Address");
    const member = await factory.create("Member", {
      cpf: cpf.generate(),
      church_cnpj: church.cnpj,
      address_id: address.id,
    });

    const user = {
      password: "Tb@23j90",
      permission: "admin",
    };

    const response = await request(app)
      .post(`/user?church_name=${church.get().name}`)
      .set("Authorization", "Bearer 122344")
      .send({ ...user, cpf: member.cpf });

    await userChurch.destroy();
    await address_church.destroy();
    await church.destroy();
    await address.destroy();
    await member.destroy();

    expect(response.status).toBe(401);

    done();
  });

  it("should search for a user by ID", async (done) => {
    const userChurch = await factory.create("User", {
      username: "church4",
      password: "Ibab$391",
      permission: "super",
    });

    const address_church = await factory.create("Address");

    const church = await factory.create("Church", {
      cnpj: cnpj.generate(),
      address_id: address_church.id,
      user_id: userChurch.id,
    });

    const token = userChurch.generateToken();

    const address = await factory.create("Address");
    const user = await factory.create("User", {
      username: "member1",
      password: "hB@89iJ0",
      permission: "admin",
    });
    const member = await factory.create("Member", {
      cpf: cpf.generate(),
      church_cnpj: church.cnpj,
      address_id: address.id,
      user_id: user.id,
    });

    const response = await request(app)
      .get(`/user/${user.get().id}?church_name=${church.get().name}`)
      .set("Authorization", `Bearer ${token}`);

    await userChurch.destroy();
    await address_church.destroy();
    await church.destroy();
    await address.destroy();
    await member.destroy();
    await user.destroy();

    expect(response.status).toBe(200);

    done();
  });

  it("shouldn't search a user without a token", async (done) => {
    const userChurch = await factory.create("User", {
      username: "church5",
      password: "Ibab$391",
      permission: "super",
    });

    const address_church = await factory.create("Address");

    const church = await factory.create("Church", {
      cnpj: cnpj.generate(),
      address_id: address_church.id,
      user_id: userChurch.id,
    });

    const address = await factory.create("Address");
    const user = await factory.create("User", {
      username: "member2",
      password: "hB@89iJ0",
      permission: "admin",
    });
    const member = await factory.create("Member", {
      cpf: cpf.generate(),
      church_cnpj: church.cnpj,
      address_id: address.id,
      user_id: user.id,
    });

    const response = await request(app).get(
      `/user/${user.get().id}?church_name=${church.get().name}`
    );

    await userChurch.destroy();
    await address_church.destroy();
    await church.destroy();
    await address.destroy();
    await member.destroy();
    await user.destroy();

    expect(response.status).toBe(401);

    done();
  });

  it("should check if a user exists", async (done) => {
    const userChurch = await factory.create("User", {
      username: "church6",
      password: "Ibab$391",
      permission: "super",
    });

    const address_church = await factory.create("Address");

    const church = await factory.create("Church", {
      cnpj: cnpj.generate(),
      address_id: address_church.id,
      user_id: userChurch.id,
    });

    const token = userChurch.generateToken();

    const address = await factory.create("Address");
    const user = await factory.create("User", {
      username: "member3",
      password: "hB@89iJ0",
      permission: "admin",
    });
    const member = await factory.create("Member", {
      cpf: cpf.generate(),
      church_cnpj: church.cnpj,
      address_id: address.id,
      user_id: user.id,
    });

    const response = await request(app)
      .get(`/user/150?church_name=${church.get().name}`)
      .set("Authorization", `Bearer ${token}`);

    await userChurch.destroy();
    await address_church.destroy();
    await church.destroy();
    await address.destroy();
    await member.destroy();
    await user.destroy();

    expect(response.status).toBe(404);

    done();
  });

  it("shouldn't return the user's password", async (done) => {
    const userChurch = await factory.create("User", {
      username: "church7",
      password: "Ibab$391",
      permission: "super",
    });

    const address_church = await factory.create("Address");

    const church = await factory.create("Church", {
      cnpj: cnpj.generate(),
      address_id: address_church.id,
      user_id: userChurch.id,
    });

    const token = userChurch.generateToken();

    const address = await factory.create("Address");
    const user = await factory.create("User", {
      username: "member4",
      password: "hB@89iJ0",
      permission: "admin",
    });
    const member = await factory.create("Member", {
      cpf: cpf.generate(),
      church_cnpj: church.cnpj,
      address_id: address.id,
      user_id: user.id,
    });

    const response = await request(app)
      .get(`/user/${user.get().id}?church_name=${church.get().name}`)
      .set("Authorization", `Bearer ${token}`);

    await userChurch.destroy();
    await address_church.destroy();
    await church.destroy();
    await address.destroy();
    await member.destroy();
    await user.destroy();

    expect(response.body).not.toHaveProperty("password");

    done();
  });

  it("should return all registered users who have administrator permission", async (done) => {
    const userChurch = await factory.create("User", {
      username: "church8",
      password: "Ibab$391",
      permission: "super",
    });

    const address_church = await factory.create("Address");

    const church = await factory.create("Church", {
      name: "Igreja Batista de Aracaju",
      cnpj: cnpj.generate(),
      address_id: address_church.id,
      user_id: userChurch.id,
    });

    const token = userChurch.generateToken();

    const address = await factory.create("Address");
    const user = await factory.create("User", {
      username: "member5",
      password: "hB@89iJ0",
      permission: "admin",
    });
    const member = await factory.create("Member", {
      cpf: cpf.generate(),
      church_cnpj: church.cnpj,
      address_id: address.id,
      user_id: user.id,
    });

    const user1 = await factory.create("User", {
      username: "member6",
      permission: "admin",
    });

    const user2 = await factory.create("User", {
      username: "member7",
      permission: "admin",
    });

    const response = await request(app)
      .get(`/users?church_name=${church.get().name}`)
      .set("Authorization", `Bearer ${token}`);

    await userChurch.destroy();
    await address_church.destroy();
    await church.destroy();
    await address.destroy();
    await member.destroy();
    await user.destroy();
    await user1.destroy();
    await user2.destroy();

    expect(response.status).toBe(200);

    done();
  });

  it("should update a user", async (done) => {
    const userChurch = await factory.create("User", {
      username: "church9",
      password: "Ibab$391",
      permission: "super",
    });

    const address_church = await factory.create("Address");

    const church = await factory.create("Church", {
      cnpj: cnpj.generate(),
      address_id: address_church.id,
      user_id: userChurch.id,
    });

    const token = userChurch.generateToken();

    const address = await factory.create("Address");
    const user = await factory.create("User", {
      username: "member8",
      password: "hB@89iJ0",
      permission: "admin",
    });
    const member = await factory.create("Member", {
      cpf: cpf.generate(),
      church_cnpj: church.cnpj,
      address_id: address.id,
      user_id: user.id,
    });

    user.username = "member8.0";
    user.save();

    const response = await request(app)
      .put(`/user/${user.get().id}?church_name=${church.get().name}`)
      .set("Authorization", `Bearer ${token}`)
      .send({ user: user.get() });

    await userChurch.destroy();
    await address_church.destroy();
    await church.destroy();
    await address.destroy();
    await member.destroy();
    await user.destroy();

    expect(response.status).toBe(200);

    done();
  });

  it("shouldn't update a user's permission if the user doesn't exist", async (done) => {
    const userChurch = await factory.create("User", {
      username: "church10",
      password: "Ibab$391",
      permission: "super",
    });

    const address_church = await factory.create("Address");

    const church = await factory.create("Church", {
      cnpj: cnpj.generate(),
      address_id: address_church.id,
      user_id: userChurch.id,
    });

    const token = userChurch.generateToken();

    const address = await factory.create("Address");
    const user = await factory.create("User", {
      username: "member9",
      password: "hB@89iJ0",
      permission: "admin",
    });
    const member = await factory.create("Member", {
      cpf: cpf.generate(),
      church_cnpj: church.cnpj,
      address_id: address.id,
      user_id: user.id,
    });

    user.username = "member9.0";
    user.save();

    const response = await request(app)
      .put(`/user/300?church_name=${church.get().name}`)
      .set("Authorization", `Bearer ${token}`)
      .send({ user: user.get() });

    await userChurch.destroy();
    await address_church.destroy();
    await church.destroy();
    await address.destroy();
    await member.destroy();
    await user.destroy();

    expect(response.status).toBe(404);

    done();
  });

  it("shouldn't update a user's if some information is an empty string", async (done) => {
    const userChurch = await factory.create("User", {
      username: "church11",
      password: "Ibab$391",
      permission: "super",
    });

    const address_church = await factory.create("Address");

    const church = await factory.create("Church", {
      cnpj: cnpj.generate(),
      address_id: address_church.id,
      user_id: userChurch.id,
    });

    const token = userChurch.generateToken();

    const address = await factory.create("Address");
    const user = await factory.create("User", {
      username: "member10",
      password: "hB@89iJ0",
      permission: "admin",
    });
    const member = await factory.create("Member", {
      cpf: cpf.generate(),
      church_cnpj: church.cnpj,
      address_id: address.id,
      user_id: user.id,
    });

    const user2 = {
      username: " ",
      permission: "admin",
    };

    const response = await request(app)
      .put(`/user/${user.get().id}?church_name=${church.get().name}`)
      .set("Authorization", `Bearer ${token}`)
      .send({ user: user2 });

    await userChurch.destroy();
    await address_church.destroy();
    await church.destroy();
    await address.destroy();
    await member.destroy();
    await user.destroy();

    expect(response.status).toBe(400);

    done();
  });

  it("should delete a user", async (done) => {
    const userChurch = await factory.create("User", {
      username: "church12",
      password: "Ibab$391",
      permission: "super",
    });

    const address_church = await factory.create("Address");

    const church = await factory.create("Church", {
      cnpj: cnpj.generate(),
      address_id: address_church.id,
      user_id: userChurch.id,
    });

    const token = userChurch.generateToken();

    const address = await factory.create("Address");
    const user = await factory.create("User", {
      username: "member11",
      password: "hB@89iJ0",
      permission: "admin",
    });
    const member = await factory.create("Member", {
      cpf: cpf.generate(),
      church_cnpj: church.cnpj,
      address_id: address.id,
      user_id: user.id,
    });

    const response = await request(app)
      .delete(`/user/${user.get().id}?church_name=${church.get().name}`)
      .set("Authorization", `Bearer ${token}`);

    await userChurch.destroy();
    await address_church.destroy();
    await church.destroy();
    await address.destroy();
    await member.destroy();
    await user.destroy();

    expect(response.status).toBe(200);

    done();
  });

  it("shouldn't delete a user if it doesn't exist", async (done) => {
    const userChurch = await factory.create("User", {
      username: "church13",
      password: "Ibab$391",
      permission: "super",
    });

    const address_church = await factory.create("Address");

    const church = await factory.create("Church", {
      cnpj: cnpj.generate(),
      address_id: address_church.id,
      user_id: userChurch.id,
    });

    const token = userChurch.generateToken();

    const address = await factory.create("Address");
    const user = await factory.create("User", {
      username: "member12",
      password: "hB@89iJ0",
      permission: "admin",
    });
    const member = await factory.create("Member", {
      cpf: cpf.generate(),
      church_cnpj: church.cnpj,
      address_id: address.id,
      user_id: user.id,
    });

    const response = await request(app)
      .delete(`/user/199?church_name=${church.get().name}`)
      .set("Authorization", `Bearer ${token}`);

    await userChurch.destroy();
    await address_church.destroy();
    await church.destroy();
    await address.destroy();
    await member.destroy();
    await user.destroy();

    expect(response.status).toBe(404);
    done();
  });
});
