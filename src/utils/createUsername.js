const createUsername = (name, type = "member") => {
  let nameReceveid = name;
  let username;

  nameReceveid = nameReceveid.normalize("NFD").replace(/[\u0300-\u036f]/g, "");

  if (type === "member") {
    const splitName = nameReceveid.toLowerCase().split(" ");
    const fim = splitName.length - 1;
    username = splitName[0] + "_" + splitName[fim];
  } else {
    let churchName = nameReceveid.toLowerCase().replace(/d(a|e|o|s)/gi, "");
    username = churchName.replace(/\s+/g, "_");
  }

  return username;
};

module.exports = createUsername;
