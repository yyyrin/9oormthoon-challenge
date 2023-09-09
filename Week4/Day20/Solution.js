const readline = require("readline");

let rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let input = [];

rl.on("line", (line) => {
  input.push(line);
}).on("close", () => {
  // 배열의 크기, 연결 요소를 지울 기준, 문자를 적을 횟수
  const [N, K, Q] = input[0].split(" ").map(Number);
  let board = input.slice(1, N + 1).map((e) => [...e]);

  const dx = [-1, 0, 1, 0];
  const dy = [0, -1, 0, 1];

  for (let i = N + 1; i < input.length; i++) {
    let [x, y, str] = input[i].split(" ");

    // 좌표 조정
    x = Number(x) - 1;
    y = Number(y) - 1;
    board[x][y] = str;

    // BFS
    const queue = [[x, y]];
    const visited = Array.from({ length: N }, () => Array(N).fill(false));
    visited[x][y] = true;
    const path = [];

    while (queue.length) {
      const [currentX, currentY] = queue.shift();
      // 요소에 포함될 때마다, path에 좌표 추가
      path.push([currentX, currentY]);

      // dx, dy 이용
      for (let j = 0; j < 4; j++) {
        const nextX = currentX + dx[j];
        const nextY = currentY + dy[j];

        // 범위 확인
        if (nextX > -1 && nextX < N && nextY > -1 && nextY < N) {
          // 방문 확인 및 board 값이 str인지 확인
          if (!visited[nextX][nextY] && board[nextX][nextY] === str) {
            visited[nextX][nextY] = true;
            queue.push([nextX, nextY]);
          }
        }
      }
    }

    // path의 길이가 K 이상이라면, 포함된 좌표를 .으로 변경
    if (path.length >= K) {
      for (const [cx, cy] of path) {
        board[cx][cy] = ".";
      }
    }
  }

  for (const row of board) {
    console.log(row.join(""));
  }
});
