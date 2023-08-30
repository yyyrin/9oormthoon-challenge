const readline = require("readline");

let rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let lines = [];

rl.on("line", (line) => {
  lines.push(line.split(" ").map(Number));
}).on("close", () => {
  const [N, K] = lines[0]; // 마을의 크기, 단지의 기준
  let town = lines.slice(1); // 마을의 상태
  let visited = Array.from(Array(N), () => Array(N).fill(0));
  let complex = {}; // 건물의 유형: 단지 수

  const dx = [-1, 0, 1, 0];
  const dy = [0, 1, 0, -1];

  for (let i = 0; i < N; i++) {
    for (let j = 0; j < N; j++) {
      // 방문하지 않았다면
      if (!visited[i][j]) {
        let type = town[i][j];
        let cnt = 1;
        let queue = [];
        queue.push([i, j]);
        visited[i][j]++;

        // BFS
        while (queue.length > 0) {
          let [currentR, currentC] = queue.pop();

          for (let k = 0; k < 4; k++) {
            let nextR = currentR + dx[k];
            let nextC = currentC + dy[k];

            if (
              nextR > -1 &&
              nextR < N &&
              nextC > -1 &&
              nextC < N &&
              town[nextR][nextC] === type &&
              !visited[nextR][nextC]
            ) {
              cnt++;
              visited[nextR][nextC]++;
              queue.push([nextR, nextC]);
            }
          }
        }

        // 단지가 될 수 있는 경우
        if (cnt >= K) {
          if (!complex[town[i][j]]) complex[town[i][j]] = 1;
          else complex[town[i][j]]++;
        }
      }
    }
  }

  // 가장 많은 단지의 개수
  const maxCnt = Math.max(...Object.values(complex));
  const complexKeys = Object.keys(complex);
  // 가장 많은 단지를 가진 타입 중 큰 수
  const result = Math.max(...complexKeys.filter((e) => complex[e] === maxCnt));

  console.log(result);
  process.exit();
});