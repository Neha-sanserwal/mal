const { MalValue } = require("./types");

const pr_str = (value) => {
  if (value instanceof MalValue) return value.pr_str();
  return value;
};

module.exports = {
  pr_str,
};
