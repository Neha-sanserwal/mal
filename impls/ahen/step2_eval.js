const readline = require("readline");
const { read_str } = require("./reader");
const { pr_str } = require("./printer");
const { List, Symbol, Vector, HashMap } = require("./types");

const repl_env = {
  "+": (a, b) => a + b,
  "-": (a, b) => a - b,
  "*": (a, b) => a * b,
  "/": (a, b) => a / b,
};

const READ = (str) => read_str(str);

const EVAL = (ast) => {
  if (!(ast instanceof List)) {
    return eval_ast(ast, repl_env);
  }
  if (ast.isEmpty()) {
    return ast;
  }
  const evaluatedList = eval_ast(ast, repl_env);
  return evaluatedList.ast[0].apply(null, evaluatedList.ast.slice(1));
};

const PRINT = (str) => pr_str(str, true);
const rep = (str) => PRINT(EVAL(READ(str), repl_env));

const eval_ast = (ast, env) => {
  if (ast instanceof Symbol) {
    if (env[ast.value] === undefined) {
      throw new Error(`symbol not defined:${ast}`);
    }
    return env[ast.value];
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
