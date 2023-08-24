const readline = require("readline");

let rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let lines = [];

rl.on("line", (line) => {
  lines.push(line.split(" "));
}).on("close", () => {
  const [N, K] = lines[0].map(Number); // 한 변의 길이, 폭탄 떨어뜨리는 횟수
  let originalGround = lines.slice(1, 1 + N); // 땅의 상태
  const bomb = lines.slice(N + 1); // 폭탄 떨어뜨릴 땅 좌표(y, x)

  // 0으로 채워진 NxN 2차원 배열
  let changeGround = Array.from(Array(N), () => Array(N).fill(0));
  let maxValue = 0; // 가장 높은 값

  // 떨어진 폭탄 위치 및 상하좌우 좌표 계산
  const dx = [0, -1, 0, 1, 0];
  const dy = [0, 0, 1, 0, -1];

  for (let i = 0; i < K; i++) {
    // 떨어진 폭탄 위치
    const bombX = Number(bomb[i][0]) - 1;
    const bombY = Number(bomb[i][1]) - 1;

    for (let j = 0; j < 5; j++) {
      let nx = bombX + dx[j];
      let ny = bombY + dy[j];

      // 좌표 내에 있고 "#"가 아니라면
      if (
        nx > -1 &&
        nx < N &&
        ny > -1 &&
        ny < N &&
        originalGround[nx][ny] !== "#"
      ) {
        if (originalGround[nx][ny] === "@") changeGround[nx][ny] += 2;
        else changeGround[nx][ny]++;

        // 최댓값 갱신
        if (changeGround[nx][ny] > maxValue) maxValue = changeGround[nx][ny];
      }
    }
  }

  console.log(maxValue);
  process.exit();
});
