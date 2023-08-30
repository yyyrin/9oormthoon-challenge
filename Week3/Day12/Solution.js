const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let lines = [];

rl.on("line", (line) => {
  lines.push(line.split(" ").map(Number));
}).on("close", () => {
  const N = lines[0][0]; // 마을의 크기
  let town = lines.slice(1); // 마을의 상태

  const dx = [-1, 0, 1, 0];
  const dy = [0, 1, 0, -1];
  let visited = Array.from(Array(N), () => Array(N).fill(0));
  let cnt = 0;

  for (let i = 0; i < N; i++) {
    for (let j = 0; j < N; j++) {
      // 집이 있고 방문하지 않았다면
      if (town[i][j] === 1 && !visited[i][j]) {
        cnt++;

        // BFS //
        // 시작점과 인접한 지역들 모두 찾을 수 있음
        // 인접한 집이 전력을 공급받고 있다면 전력을 공급받고 있다는 것
        let queue = [];
        queue.push([i, j]); // 시작점

        while (queue.length > 0) {
          let [currentR, currentC] = queue.pop();
          visited[currentR][currentC] = 1;

          for (let k = 0; k < 4; k++) {
            let nextR = currentR + dx[k];
            let nextC = currentC + dy[k];

            // 범위 내에 있으면서, 집이 있고 방문하지 않았다면
            if (nextR > -1 && nextR < N && nextC > -1 && nextC < N) {
              if (town[nextR][nextC] === 1 && !visited[nextR][nextC]) {
                queue.push([nextR, nextC]);
              }
            }
          }
        }
      }
    }
  }
  console.log(cnt);
  process.exit();
});
