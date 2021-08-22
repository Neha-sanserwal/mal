const pr_str = (value, print_readably) => {
  if (value instanceof MalValue) return value.pr_str(print_readably);
  return value.toString();
};
class MalValue {}
class List extends MalValue {
  constructor(ast) {
    super();
    this.ast = ast;
  }

  isEmpty() {
    return this.ast.length === 0;
  }

  pr_str(print_readably = false) {
    return `(${this.ast.map((element) => pr_str(element)).join(" ")})`;
  }
}

class Vector extends MalValue {
  constructor(ast) {
    super();
    this.ast = ast;
  }

  isEmpty() {
    return this.ast.length === 0;
  }

  pr_str(print_readably = false) {
    return `[${this.ast.map((element) => pr_str(element)).join(" ")}]`;
  }
}

class Nil extends MalValue {
  constructor(val) {
    super();
  }
  pr_str(print_readably = false) {
    return `nil`;
  }
}

class Str extends MalValue {
  constructor(val) {
    super();
    this.val = val;
  }

  pr_str(print_readably = false) {
    return print_readably
      ? `"${this.val
          .replace(/\\/g, "\\\\")
          .replace(/"/g, '\\"')
          .replace(/\n/g, "\\n")}"`
      : `"${this.val}"`;
  }
}

class HashMap extends MalValue {
  constructor(ast) {
    super();
    this.map = ast;
  }

  pr_str(print_readably = false) {
    let representaion = [];
    for (const entry of this.map.entries()) {
      representaion.push(entry.map((e) => pr_str(e)).join(" "));
    }
    return `{${representaion.join(", ")}}`;
  }
}

class Keyword extends MalValue {
  constructor(value) {
    super();
    this.value = value;
  }
  pr_str(print_readably = false) {
    return `:${this.value}`;
  }
}

class Symbol extends MalValue {
  constructor(value) {
    super();
    this.value = value;
  }
  pr_str(print_readably = false) {
    return `${this.value}`;
  }
}

class Fn extends MalValue {
  constructor(binds, fnBody, env) {
    this.binds = binds;
    this.fnBody = fnBody;
    this.env = env;
  }
  pr_str(print_readably = false) {
    return `#<function>`;
  }
}

module.exports = {
  List,
  MalValue,
  Vector,
  pr_str,
  HashMap,
  Str,
  Nil,
  Keyword,
  Symbol,
  Fn,
};
