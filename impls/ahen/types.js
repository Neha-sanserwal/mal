class MalValue {}

class MalList extends MalValue {
  constructor(ast) {
    super();
    this.ast = ast;
  }

  pr_str() {
    return `(` + this.ast.map((x) => x.toString()).join(" ") + ")";
  }
}

module.exports = {
  MalList,
  MalValue,
};
