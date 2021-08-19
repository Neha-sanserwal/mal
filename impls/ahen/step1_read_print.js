const readline = require("readline");
const { read_str } = require("./reader");
const { pr_str } = require("./printer");
const READ = (str) => read_str(str);
const EVAL = (str) => str;
const PRINT = (str) => pr_str(str);
const rep = (str) => PRINT(EVAL(READ(str)));

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
