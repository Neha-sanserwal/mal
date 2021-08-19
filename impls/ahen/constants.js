const PREDEFINED_KEYWORDS = {
  true: true,
  false: false,
  null: null,
};

const ENCLOSERS = {
  LIST: { start: "(", end: ")" },
  VECTOR: { start: "(", end: ")" },
  HASH_MAP: { start: "{", end: "}" },
};

module.exports = { PREDEFINED_KEYWORDS, ENCLOSERS };
