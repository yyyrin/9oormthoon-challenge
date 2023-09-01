const readline = require("readline");

let rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let lines = [];

rl.on("line", (line) => {
  lines.push(line.split(" ").map(Number));
}).on("close", () => {
  const [N, K] = lines[0]; // 과일의 개수, 플레이어가 가진 돈
  let result = 0;

  // [C/P 포만감, 조각 개수]
  const fullnessArr = lines
    .slice(1)
    .map((fruit) => {
      return [parseInt(fruit[1] / fruit[0]), fruit[0]];
    })
    .sort((a, b) => b[0] - a[0]);

  // 플레이어가 가진 돈
  let money = K;

  // 최대 포만감 계산
  for (let i = 0; i < N; i++) {
    if (fullnessArr[i][1] >= money) {
      result += money * fullnessArr[i][0];
      break;
    } else {
      result += fullnessArr[i][0] * fullnessArr[i][1];
      money -= fullnessArr[i][1];
    }
  }

  console.log(result);
  process.exit();
});
