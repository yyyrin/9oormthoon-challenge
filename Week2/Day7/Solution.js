const readline = require("readline");

let rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let lines = [];

rl.on("line", (line) => {
  lines.push(line.split(" ").map(Number));
}).on("close", () => {
  const [n, k] = lines[0]; // 게임판의 크기, 깃발의 값
  let board = lines.slice(1); // 게임판
  let res = 0;

  // 상하좌우, 대각선으로 인접한 8칸의 좌표 계산
  const xArr = [-1, -1, -1, 0, 0, 1, 1, 1];
  const yArr = [-1, 0, 1, -1, 1, -1, 0, 1];

  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      // 구름이 없는 칸인 경우
      if (board[i][j] === 0) {
        let cnt = 0;

        // 인접 8칸 중 구름 개수 구하기
        for (let a = 0; a < 8; a++) {
          let rx = i + xArr[a];
          let ry = j + yArr[a];
          if (rx > -1 && rx < n && ry > -1 && ry < n && board[rx][ry] === 1) {
            cnt++;
          }
        }

        // 인접 8칸 중 구름의 개수가 구하고자 하는 값(k)와 같은 경우
        if (cnt === k) res++;
      }
    }
  }

  console.log(res);
  process.exit();
});
