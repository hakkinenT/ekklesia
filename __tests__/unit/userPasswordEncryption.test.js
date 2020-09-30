const factory = require("../factories");
const bcrypt = require("bcryptjs");

describe("User password encryption", () => {
  it("should encrypt user password", async (done) => {
    const user = await factory.create("User", {
      username: "igreja",
      permission: "super",
    });

    const compareHash = await bcrypt.compare("Th@l1234", user.password);

    expect(compareHash).toBe(true);

    done();
  });
});
