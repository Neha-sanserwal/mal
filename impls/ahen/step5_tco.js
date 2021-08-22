const readline = require("readline");
const { read_str } = require("./reader");
const { pr_str } = require("./printer");
const { List, Symbol, Vector, HashMap, Nil, Fn } = require("./types");
const { Env } = require("./env");

const repl_env = new Env(null);
repl_env.set(new Symbol("+"), (args) => {
  return args.reduce((a, b) => a + b, 0);
});
repl_env.set(new Symbol("-"), (args) => {
  if (!args.length) {
    throw "Wrong number of args passed";
  }

  return args.reduce((a, b) => a - b);
});
repl_env.set(new Symbol("*"), (args) => {
  if (!args.length) {
    throw "Wrong number of args passed";
  }
  return args.reduce((a, b) => a * b, 1);
});
repl_env.set(new Symbol("/"), (args) => {
  if (!args.length) {
    throw "Wrong number of args passed";
  }
  return args.reduce((a, b) => parseInt(a) / b);
});
repl_env.set(new Symbol("="), (args) => {
  if (!args.length) {
    throw "Wrong number of args passed";
  }
  return args.reduce((a, b) => a === b);
});

repl_env.set(new Symbol("list"), (args) => {
  if (!args.length) {
    throw "Wrong number of args passed";
  }
  return new List(args);
});

const READ = (str) => read_str(str);

const EVAL = (ast, env) => {
  if (!(ast instanceof List)) {
    return eval_ast(ast, env);
  }

  if (ast.isEmpty()) {
    return ast;
  }

  const symbol = ast.ast[0];
  while (true) {
    switch (symbol.value) {
      case "def!": {
        if (ast.ast.length !== 3) throw "wrong number of arguments!";
        const val = EVAL(ast.ast[2], env);
        return env.set(ast.ast[1], val);
      }
      case "let*": {
        innerEnv = new Env(env);
        const bindings = ast.ast[1].ast;
        for (
          let binding = 0;
          binding < bindings.length;
          binding = binding + 2
        ) {
          const [key, value] = bindings.slice(binding, binding + 2);
          innerEnv.set(key, EVAL(value, innerEnv));
        }
        env = innerEnv;
        ast = ast.ast[2];
        break;
      }
      case "do": {
        if (ast.isEmpty()) {
          ast = NilValue;
        }
        ast.ast.slice(1, -1).reduce((_, form) => EVAL(form, env), NilValue);
        ast = ast.ast.slice(-1);
        break;
      }
      case "if": {
        if (ast.ast.length < 3 || ast.ast.length > 4) {
          throw new Error("wrong number of arguments for if");
        }
        const [condition, expForTrue, expForFalse] = ast.ast.slice(1);
        const result = EVAL(condition, env);
        if (result instanceof Nil || result === false) {
          ast = expForFalse || NilValue;
        } else {
          ast = expForTrue;
        }
        break;
      }
      case "fn*": {
        return new Fn(ast.ast[1], ast.ast[2], env);
      }
    }
    const [fn, ...args] = eval_ast(ast, env).ast;
    if (fn instanceof Fn) {
      ast = fn.fnBody;
      env = Env.createEnv(env, fn.binds, args);
    }
    if (fn instanceof Function) {
      return fn.call(null, args);
    }
    throw `${fn} not a function.`;
  }
};

const PRINT = (str) => pr_str(str, true);
const rep = (str) => PRINT(EVAL(READ(str), repl_env));

const eval_ast = (ast, env) => {
  if (ast instanceof Symbol) {
    return env.get(ast.value);
  }
  if (ast instanceof List) {
    const evaluatedList = ast.ast.map((element) => EVAL(element, env));
    return new List(evaluatedList);
  }
  if (ast instanceof Vector) {
    const evaluatedList = ast.ast.map((element) => EVAL(element, env));
    return new Vector(evaluatedList);
  }
  if (ast instanceof HashMap) {
    const evaluatedMap = new Map();
    for (const [key, value] of ast.map.entries()) {
      const evaluatedValue = EVAL(value, env);
      evaluatedMap.set(key, evaluatedValue);
    }
    return new HashMap(evaluatedMap);
  }
  return ast;
};

const main = () => {
  const reader = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  reader.question("user> ", (str) => {
    try {
      console.log(rep(str));
    } catch (error) {
      console.log(error);
    } finally {
      reader.close();

      main();
    }
  });
};

main();
