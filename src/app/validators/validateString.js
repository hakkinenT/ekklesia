const validateString = (string) => {
  const stringIsEmpty = string.trim();
  if (!stringIsEmpty) {
    throw new Error("The string cannot be empty");
  }

  return string;
};

module.exports = validateString;
