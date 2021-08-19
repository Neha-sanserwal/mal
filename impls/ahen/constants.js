const { Nil } = require("./types");

const PREDEFINED_KEYWORDS = {
  true: true,
  false: false,
  null: Nil,
};

const ENCLOSERS = {
  LIST: { start: "(", end: ")" },
  VECTOR: { start: "[", end: "]" },
  HASH_MAP: { start: "{", end: "}" },
  STRING: { start: `"`, end: `"` },
};

module.exports = { PREDEFINED_KEYWORDS, ENCLOSERS };
