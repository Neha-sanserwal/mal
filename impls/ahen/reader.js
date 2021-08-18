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
    this.position++;
    return token;
  }
}

const tokenize = (str) => {
  const matcher =
    /[\s,]*(~@|[\[\]{}()'`~^@]|"(?:\\.|[^\\"])*"?|;.*|[^\s\[\]{}('"`,;)]*)/g;
  return [...str.matchAll(matcher)].slice(0, -1).map((match) => match[1]);
};

const read_atom = (reader) => {
  const token = reader.peak();
  if (token.match(/^\d+$/g) !== null) {
    return parseInt(token);
  }
  if (token.match(/^\d+\.\d+$/g) !== null) {
    return parseFloat(token);
  }
  return token;
};

const read_list = (reader) => {
  const ast = [];
  reader.next();
  while (reader.peak() !== ")") {
    ast.push(read_form(reader));
    reader.next();
  }
  return ast;
};

const read_form = (reader) => {
  if (reader.peak() === "(") {
    return read_list(reader);
  }
  return read_atom(reader);
};

const read_str = (str) => {
  const tokens = tokenize(str);
  const reader = new Reader(tokens);
  return read_form(reader);
};

module.exports = { Reader, read_str };
