const { PREDEFINED_KEYWORDS, ENCLOSERS } = require("./Constants");
const { List, Vector, HashMap } = require("./types");

class Reader {
  constructor(tokens) {
    this.tokens = tokens;
    this.position = 0;
  }
  peak() {
    return this.tokens[this.position];
  }
  next() {
    const token = this.peak();
    if (this.position < this.tokens.length) this.position++;
    return token;
  }
}

const tokenize = (str) => {
  const matcher =
    /[\s,]*(~@|[\[\]{}()'`~^@]|"(?:\\.|[^\\"])*"?|;.*|[^\s\[\]{}('"`,;)]*)/g;
  return [...str.matchAll(matcher)].map((match) => match[1]).slice(0, -1);
};

const read_atom = (reader) => {
  const token = reader.next();
  if (token.match(/^\d+$/g) !== null) {
    return parseInt(token);
  }
  if (token.match(/^\d+\.\d+$/g) !== null) {
    return parseFloat(token);
  }
  if (token in PREDEFINED_KEYWORDS) {
    PREDEFINED_KEYWORDS[token];
  }

  return token;
};

const read_ast = (reader, enlosure) => {
  const ast = [];
  reader.next();
  while (reader.peak() !== enlosure.end) {
    if (reader.peak() === undefined) {
      throw "unbalanced";
    }
    ast.push(read_form(reader));
  }
  reader.next();
  return ast;
};

const read_list = (reader) => {
  return new List(read_ast(reader, ENCLOSERS.LIST));
};

const read_has_map = (reader) => {
  return new HashMap(read_ast(reader, ENCLOSERS.HASH_MAP));
};

const read_vector = (reader) => {
  return new Vector(read_ast(reader, ENCLOSERS.VECTOR));
};

const read_form = (reader) => {
  switch (reader.peak()) {
    case ENCLOSERS.LIST.start:
      return read_list(reader);
    case ENCLOSERS.VECTOR.start:
      return read_vector(reader);
    case ENCLOSERS.HASH_MAP.start:
      return read_has_map(reader);

    default:
  }
  return read_atom(reader);
};

const read_str = (str) => {
  const tokens = tokenize(str);
  const reader = new Reader(tokens);
  return read_form(reader);
};

module.exports = { Reader, read_str };
