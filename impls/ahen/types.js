class MalValue {}
class List extends MalValue {
  constructor(ast) {
    super();
    this.ast = ast;
  }

  pr_str() {
    return `(${this.ast.map((element) => pr_str(element)).join(" ")})`;
  }
}

class Vector extends MalValue {
  constructor(ast) {
    super();
    this.ast = ast;
  }

  pr_str() {
    return `[${this.ast.map((element) => pr_str(element)).join(" ")}]`;
  }
}

class Nil extends MalValue {
  constructor(val) {
    super();
  }
  pr_str() {
    return `nil`;
  }
}

class String extends MalValue {
  constructor(val) {
    super();
    this.val = val;
  }

  pr_str() {
    return `"${this.val}"`;
  }
}

const pr_str = (value) => {
  if (value instanceof MalValue) return value.pr_str();
  return value.toString();
};

class HashMap extends MalValue {
  constructor(ast) {
    super();
    this.map = new Map();
    for (let pos = 0; pos < ast.length; pos = pos + 2) {
      this.map.set(ast[pos], ast[pos + 1]);
    }
  }

  pr_str() {
    let representaion = [];
    for (const entry of this.map.entries()) {
      const [key, value] = entry;
      representaion.push(entry.map((e) => pr_str(e)).join(" "));
    }
    return `{${representaion.join(",")}}`;
  }
}

module.exports = {
  List,
  MalValue,
  Vector,
  pr_str,
  HashMap,
  String,
  Nil: new Nil(),
};
