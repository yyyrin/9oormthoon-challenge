const readline = require("readline");

let rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let lines = [];

rl.on("line", (line) => {
  lines.push(line.split(" "));
}).on("close", () => {
  const N = Number(lines[0][0]); // 보드의 크기
  const [gx, gy] = lines[1].map(Number); // 구름이의 좌표
  const [px, py] = lines[2].map(Number); // 플레이어의 좌표
  const board = lines.slice(3); // 보드
  // <command>별 좌표 이동
  const command = { U: [-1, 0], D: [1, 0], R: [0, 1], L: [0, -1] };

  // 점수 계산 함수
  function gameJam(x, y) {
    let nx = x - 1,
      ny = y - 1;
    // 좌표별 방문 여부 체크
    let visitedBoard = Array.from(Array(N), () => Array(N).fill(0)); 
    let cnt = 0;

    while (visitedBoard[nx][ny] === 0) {
      let move = board[nx][ny];
      let steps = parseInt(move.slice(0, -1)); // 이동 횟수
      let dir = move.slice(-1); // 이동 방향
      let [dx, dy] = command[dir];

      // 이동 횟수만큼 한 칸씩 이동
      for (let i = 0; i < steps; i++) {
        visitedBoard[nx][ny]++;
        nx = (nx + dx + N) % N;
        ny = (ny + dy + N) % N;
        cnt++;
        // 방문한 적 있다면
        if (visitedBoard[nx][ny] !== 0) return cnt;
      }
    }

    return cnt;
  }

  const gCnt = gameJam(gx, gy); // 구름이의 점수
  const pCnt = gameJam(px, py); // 플레이어의 점수

  // 더 높은 점수 가진 사람 판별
  gCnt > pCnt ? console.log(`goorm ${gCnt}`) : console.log(`player ${pCnt}`);
  process.exit();
});
