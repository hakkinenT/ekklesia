const request = require("supertest");

const app = require("../../../src/app");
const factory = require("../../factories");

describe("User module", () => {
  it("should register a user", async (done) => {
    const userChurch = await factory.create("User", {
      username: "ibab",
      password: "Ibab$391",
      permission: "super",
    });

    const token = userChurch.generateToken();

    const user = {
      username: "tholhaol",
      password: "Th@l1802",
      permission: "comum",
    };

    const response = await request(app)
      .post("/user")
      .set("Authorization", `Bearer ${token}`)
      .send({ ...user });

    expect(response.status).toBe(200);

    done();
  });

  it("shouldn't register a user without a token", async (done) => {
    const user1 = await factory.create("User", {
      username: "julio32",
      permission: "admin",
    });
    const user = {
      username: "renataLima",
      password: "Tb@12e90",
      permission: "comum",
    };

    const response = await request(app)
      .post("/user")
      .send({ ...user });

    expect(response.status).toBe(401);

    done();
  });

  it("shouldn't register a user if the jwt token is invalid", async (done) => {
    const user1 = await factory.create("User", {
      username: "caiocesar",
      permission: "admin",
    });
    const user = {
      username: "roberto_doria",
      password: "Tb@23j90",
      permission: "comum",
    };

    const response = await request(app)
      .post("/user")
      .set("Authorization", "Bearer 122344")
      .send({ ...user });

    expect(response.status).toBe(401);

    done();
  });

  it("shouldn't register a user if the username is already registered", async (done) => {
    const user1 = await factory.create("User", {
      username: "wwoman",
      password: "hB@89iJ0",
      permission: "admin",
    });

    const token = user1.generateToken();

    const user = {
      username: "wwoman",
      password: "JH98@$km",
      permission: "comum",
    };

    const response = await request(app)
      .post("/user")
      .set("Authorization", `Bearer ${token}`)
      .send({ ...user });

    expect(response.status).toBe(400);

    done();
  });

  it("shouldn't register a user if the user who is registering doesn't have administrator or super permission", async (done) => {
    const user1 = await factory.create("User", {
      username: "cristiano_ronaldo",
      password: "Hg#o2190",
      permission: "comum",
    });

    const token = user1.generateToken();

    const user = {
      username: "homemaranha",
      password: "NPuj01&@",
      permission: "comum",
    };

    const response = await request(app)
      .post("/user")
      .set("Authorization", `Bearer ${token}`)
      .send({ ...user });

    expect(response.status).toBe(401);

    done();
  });

  it("should search for a user by ID", async (done) => {
    const user = await factory.create("User", {
      username: "junior",
      password: "Hg#o2190",
      permission: "comum",
    });

    const token = user.generateToken();

    const response = await request(app)
      .get(`/user/${user.get().id}`)
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(200);

    done();
  });

  it("shouldn't search a user without a token", async (done) => {
    const user = await factory.create("User", {
      username: "pietro",
    });

    const response = await request(app).get(`/user/${user.get().id}`);

    expect(response.status).toBe(401);

    done();
  });

  it("shouldn't search for a user if the permission type is not administrator or super or if the user is not for the searched user", async (done) => {
    const user = await factory.create("User", {
      username: "john",
      password: "Hg#o2190",
      permission: "comum",
    });

    const token = user.generateToken();

    const response = await request(app)
      .get("/user/1")
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(401);

    done();
  });

  it("should check if a user exists", async (done) => {
    const user = await factory.create("User", {
      username: "gustavo",
      password: "Hg#o2190",
      permission: "admin",
    });

    const token = user.generateToken();

    const response = await request(app)
      .get("/user/150")
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(404);

    done();
  });

  it("shouldn't return the user's password", async (done) => {
    const user = await factory.create("User", {
      username: "francisco56",
    });

    const token = user.generateToken();

    const response = await request(app)
      .get(`/user/${user.get().id}`)
      .set("Authorization", `Bearer ${token}`);

    expect(response.body).not.toHaveProperty("password");

    done();
  });
});
