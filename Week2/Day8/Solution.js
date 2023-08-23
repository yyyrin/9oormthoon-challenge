const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let ache;

rl.on("line", (line) => {
  ache = line;
  rl.close();
}).on("close", () => {
  let item_cnt = 0;

  while (ache !== 0) {
    if (ache / 14 > 0) {
      item_cnt += Math.floor(ache / 14);
      ache = ache % 14;
    }
    if (ache / 7 > 0) {
      item_cnt += Math.floor(ache / 7);
      ache = ache % 7;
    }
    item_cnt += ache;
    ache -= ache;
  }

  console.log(item_cnt);
  process.exit();
});
