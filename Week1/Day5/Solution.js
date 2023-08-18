const readline = require("readline");
let rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});
let lines = [];
rl.on("line", (line) => {
  lines.push(line.split(" ").map(Number));
});

rl.on("close", () => {
  let numbers = lines[1].map((num) => ({
    value: num,
    oneCount: [...num.toString(2)].filter((e) => e === "1").length,
  }));

  numbers.sort((a, b) => {
    if (a.oneCount !== b.oneCount) {
      return b.oneCount - a.oneCount;
    } else {
      return b.value - a.value;
    }
  });

  console.log(numbers[lines[0][1] - 1].value);
  process.exit();
});
