var readline = require("readline");

var rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.question(">>input number?  ", (answer) => {
  if (answer % 15 === 0) {
    console.log("fizzbuzz");
  } else if (answer) rl.close();
});
