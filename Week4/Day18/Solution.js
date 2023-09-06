const readline = require("readline");

let rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let input = [];

rl.on("line", (line) => {
  input.push(line.split(" "));
}).on("close", () => {
  const [N, M] = input[0].map(Number); // 정사각형의 크기, 반직선의 개수
  const board = Array.from(Array(N), () => Array(N).fill("")); // 가로선 혹은 세로선을 표시할 2차원 배열
  let cnt = 0; // 중첩 점 개수
	
  // 반직선 정보 처리
  function drawLine(x, y, direction) {
    const currentX = x - 1;
    const currentY = y - 1;
    if (direction === "R") {
      for (let i = currentY; i < N; i++) {
        board[currentX][i] += "g";
      }
    }
    if (direction === "D") {
      for (let i = currentX; i < N; i++) {
        board[i][currentY] += "s";
      }
    }
    if (direction === "L") {
      for (let i = currentY; i > -1; i--) {
        board[currentX][i] += "g";
      }
    }
    if (direction === "U") {
      for (let i = currentX; i > -1; i--) {
        board[i][currentY] += "s";
      }
    }
  }

  for (let i = 1; i <= M; i++) {
    const [x, y, direction] = input[i];
    drawLine(Number(x), Number(y), direction);
  }

  // 가로선과 세로선 모두 가진 칸 찾기
  for (let i = 0; i < N; i++) {
    for (let j = 0; j < N; j++) {
      if (board[i][j].includes("g") && board[i][j].includes("s")) {
        // 해당 칸에서 중첩 점 개수 = 가로 선 개수 * 세로 선 개수
        const seroCnt = board[i][j].split("").filter((e) => e === "s").length;
        const garoCnt = board[i][j].length - seroCnt;
        cnt += seroCnt * garoCnt;
      }
    }
  }

  console.log(cnt);
});
