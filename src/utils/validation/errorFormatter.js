const errorFormatter = ({ location, msg, param, value, nestedErrors }) => {
  return {
    type: "Error",
    name: "Validation Failure",
    location: location,
    message: msg,
    param: param,
    value: value,
    nestedErrors: nestedErrors,
  };
};

module.exports = errorFormatter;
