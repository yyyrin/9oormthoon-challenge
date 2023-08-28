const readline = require("readline");

let rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let lines = [];

rl.on("line", (line) => {
  lines.push(line.split(" ").map(Number));
}).on("close", () => {
  let ache = lines[0][0]; // 통증 수치
  const [a, b] = lines[1]; // 아이템 A, B

  // 아이템 B의 사용 개수
  let bCnt = Math.floor(ache / b);

  // 아이템 B의 개수를 1씩 줄여가며 아이템 A로 0 만들 수 있는지 확인
  while (bCnt >= 0) {
    let acheB = ache - bCnt * b;
    if (acheB % a === 0) {
      console.log(bCnt + Math.floor(acheB / a));
      process.exit();
    } else {
      bCnt--;
    }
  }

  // 통증 수치를 0으로 만들 수 없는 경우
  console.log(-1);
  process.exit();
});
