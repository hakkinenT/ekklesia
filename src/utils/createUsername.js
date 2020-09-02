const createUsername = (object, type) => {
  const { name } = object;
  let username;

  name = name.normalize("NFD").replace(/[\u0300-\u036f]/g, "");

  if (type === "member") {
    const splitName = name.toLowerCase().split(" ");
    const fim = splitName.length - 1;
    username = splitName[0] + "_" + splitName[fim];
  } else {
    let churchName = name.toLowerCase().replace(/d(a|e|o|s)/gi, "");
    username = churchName.replace(/\s+/g, "_");
  }

  return username;
};

module.exports = createUsername;
