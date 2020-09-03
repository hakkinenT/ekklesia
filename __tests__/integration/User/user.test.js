const request = require("supertest");

const app = require("../../../src/app");
const factory = require("../../factories");
const { cpf, cnpj } = require("cpf-cnpj-validator");

describe("User module", () => {
  it("should register a user", async (done) => {
    const userChurch = await factory.create("User", {
      username: "ibab",
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
      username: "tholhaol",
      password: "Th@l1802",
      permission: "admin",
    };

    const response = await request(app)
      .post(`/user?church_name=${church.get().name}`)
      .set("Authorization", `Bearer ${token}`)
      .send({ ...user, cpf: member.cpf });

    expect(response.status).toBe(200);

    done();
  });

  it("shouldn't register a user without a token", async (done) => {
    const userChurch = await factory.create("User", {
      username: "ibab",
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
      username: "renataLima",
      password: "Tb@12e90",
      permission: "admin",
    };

    const response = await request(app)
      .post(`/user?church_name=${church.get().name}`)
      .send({ ...user, cpf: member.cpf });

    expect(response.status).toBe(401);

    done();
  });

  it("shouldn't register a user if the jwt token is invalid", async (done) => {
    const userChurch = await factory.create("User", {
      username: "ibab",
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
      username: "roberto_doria",
      password: "Tb@23j90",
      permission: "admin",
    };

    const response = await request(app)
      .post(`/user?church_name=${church.get().name}`)
      .set("Authorization", "Bearer 122344")
      .send({ ...user, cpf: member.cpf });

    expect(response.status).toBe(401);

    done();
  });

  /*it("shouldn't register a user if the username is already registered", async (done) => {
    const user1 = await factory.create("User", {
      username: "wwoman",
      password: "hB@89iJ0",
      permission: "admin",
    });

    const token = user1.generateToken();

    const user = {
      username: "wwoman",
      password: "JH98@$km",
      permission: "admin",
    };

    const response = await request(app)
      .post("/user")
      .set("Authorization", `Bearer ${token}`)
      .send({ ...user });

    expect(response.status).toBe(400);

    done();
  });*/

  it("should search for a user by ID", async (done) => {
    const userChurch = await factory.create("User", {
      username: "ibab",
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
      username: "wwoman",
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

    expect(response.status).toBe(200);

    done();
  });

  it("shouldn't search a user without a token", async (done) => {
    const userChurch = await factory.create("User", {
      username: "ibab",
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
      username: "wwoman",
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

    expect(response.status).toBe(401);

    done();
  });

  it("should check if a user exists", async (done) => {
    const userChurch = await factory.create("User", {
      username: "ibab",
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
      username: "wwoman",
      password: "hB@89iJ0",
      permission: "admin",
    });
    await factory.create("Member", {
      cpf: cpf.generate(),
      church_cnpj: church.cnpj,
      address_id: address.id,
      user_id: user.id,
    });

    const response = await request(app)
      .get(`/user/150?church_name=${church.get().name}`)
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(404);

    done();
  });

  it("shouldn't return the user's password", async (done) => {
    const userChurch = await factory.create("User", {
      username: "ibab",
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
      username: "wwoman",
      password: "hB@89iJ0",
      permission: "admin",
    });
    await factory.create("Member", {
      cpf: cpf.generate(),
      church_cnpj: church.cnpj,
      address_id: address.id,
      user_id: user.id,
    });

    const response = await request(app)
      .get(`/user/${user.get().id}?church_name=${church.get().name}`)
      .set("Authorization", `Bearer ${token}`);

    expect(response.body).not.toHaveProperty("password");

    done();
  });

  it("should return all registered users who have administrator permission", async (done) => {
    const userChurch = await factory.create("User", {
      username: "ibab",
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
      username: "wwoman",
      password: "hB@89iJ0",
      permission: "admin",
    });
    await factory.create("Member", {
      cpf: cpf.generate(),
      church_cnpj: church.cnpj,
      address_id: address.id,
      user_id: user.id,
    });

    await factory.create("User", {
      username: "mulhermaravilha",
      permission: "admin",
    });

    await factory.create("User", {
      username: "homemdeferro",
      permission: "admin",
    });

    await factory.create("User", {
      username: "flash",
      permission: "admin",
    });

    const admin = await factory.create("User", {
      username: "admin",
      permission: "admin",
    });

    const response = await request(app)
      .get(`/users?church_name=${church.get().name}`)
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(200);

    done();
  });

  it("should update the permission of a user", async (done) => {
    const userChurch = await factory.create("User", {
      username: "ibab",
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
      username: "wwoman",
      password: "hB@89iJ0",
      permission: "admin",
    });
    await factory.create("Member", {
      cpf: cpf.generate(),
      church_cnpj: church.cnpj,
      address_id: address.id,
      user_id: user.id,
    });

    const response = await request(app)
      .put(`/user/${user.get().id}?church_name=${church.get().name}`)
      .set("Authorization", `Bearer ${token}`)
      .send({
        username: "augusto_admin",
      });

    console.log(response);

    expect(response.status).toBe(200);

    done();
  });

  it("shouldn't update a user's permission if the user doesn't exist", async (done) => {
    const userChurch = await factory.create("User", {
      username: "ibab",
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
      username: "wwoman",
      password: "hB@89iJ0",
      permission: "admin",
    });
    await factory.create("Member", {
      cpf: cpf.generate(),
      church_cnpj: church.cnpj,
      address_id: address.id,
      user_id: user.id,
    });

    const response = await request(app)
      .put(`/user/300?church_name=${church.get().name}`)
      .set("Authorization", `Bearer ${token}`)
      .send({
        permission: "admin",
      });

    expect(response.status).toBe(404);

    done();
  });

  it("shouldn't update a user's permission if the permission is an empty string", async (done) => {
    const userChurch = await factory.create("User", {
      username: "ibab",
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
      username: "wwoman",
      password: "hB@89iJ0",
      permission: "admin",
    });
    await factory.create("Member", {
      cpf: cpf.generate(),
      church_cnpj: church.cnpj,
      address_id: address.id,
      user_id: user.id,
    });

    const response = await request(app)
      .put(`/user/${user.get().id}?church_name=${church.get().name}`)
      .set("Authorization", `Bearer ${token}`)
      .send({
        permission: "    ",
      });

    expect(response.status).toBe(400);

    done();
  });

  it("should delete a user", async (done) => {
    const userChurch = await factory.create("User", {
      username: "ibab",
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
      username: "wwoman",
      password: "hB@89iJ0",
      permission: "admin",
    });
    await factory.create("Member", {
      cpf: cpf.generate(),
      church_cnpj: church.cnpj,
      address_id: address.id,
      user_id: user.id,
    });

    const response = await request(app)
      .delete(`/user/${user.get().id}?church_name=${church.get().name}`)
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(200);

    done();
  });

  it("shouldn't delete a user if it doesn't exist", async (done) => {
    const userChurch = await factory.create("User", {
      username: "ibab",
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
      username: "wwoman",
      password: "hB@89iJ0",
      permission: "admin",
    });
    await factory.create("Member", {
      cpf: cpf.generate(),
      church_cnpj: church.cnpj,
      address_id: address.id,
      user_id: user.id,
    });

    const response = await request(app)
      .delete(`/user/199?church_name=${church.get().name}`)
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(404);
    done();
  });
});
