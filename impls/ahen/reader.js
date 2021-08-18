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

const tokanize = (str) => {
  const matcher =
    /[\s,]*(~@|[\[\]{}()'`~^@]|"(?:\\.|[^\\"])*"?|;.*|[^\s\[\]{}('"`,;)]*)/g;
  return [...str.matchAll(matcher)].slice(0, -1).map((match) => match[1]);
};

const read_form = (reader) => {
  if (reader.peak() === "(") {
    return "LIST";
  }
  return "Symbol";
};

const read_str = (str) => {
  const tokans = tokanize(str);
  const reader = new Reader(tokans);
  return read_form(reader);
};

module.exports = { Reader, read_str };
