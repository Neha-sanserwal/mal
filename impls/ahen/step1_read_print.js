const readline = require("readline");
const { read_str } = require("./reader");

const READ = (str) => read_str(str);
const EVAL = (str) => str;
const PRINT = (str) => str;

const rep = (str) => PRINT(EVAL(READ(str)));

const main = () => {
  const reader = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  reader.question("user> ", (str) => {
    console.log(rep(str));
    reader.close();
    main();
  });
};

main();
