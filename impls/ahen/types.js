class MalValue {}

class List extends MalValue {
  constructor(ast) {
    super();
    this.ast = ast;
  }

  pr_str() {
    return `(` + this.ast.map((x) => x.toString()).join(" ") + ")";
  }
}

class Vector extends MalValue {
  constructor(ast) {
    super();
    this.ast = ast;
  }

  pr_str() {
    return `[` + this.ast.map((x) => x.toString()).join(" ") + "]";
  }
}

module.exports = {
  List,
  MalValue,
  Vector,
};
