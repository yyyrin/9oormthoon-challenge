const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let lines = [];

rl.on("line", (line) => {
  lines.push(line.split(" ").map(Number));
}).on("close", () => {
  const [N, M] = lines[0]; // 섬의 개수, 다리의 개수
  let cnt = 1; // 연합의 개수
  let graph = {}; // 인접 리스트 방식으로 선언된 그래프
  visited = Array(N + 1).fill(false); // 방문여부 표시
  // 간선의 존재 여부를 확인하기 위한 인접 행렬
  const check = Array.from(Array(N + 1), () => Array(N + 1).fill(false));

  // 그래프 입력
  for (let i = 1; i <= M; i++) {
    let [start, end] = lines[i];
    // 값이 없다면 빈 배열로 초기화
    if (!graph[start]) {
      graph[start] = [];
    }
    graph[start].push(end); // start번 섬에서 이동 가능한 섬 목록에 end번 섬 추가
    check[start][end] = true; // 간선 발생시 true로 변경
  }

  // BFS 탐색
  for (let i = 1; i <= N; i++) {
    // 어떤 연합에도 속하지 않은 경우
    if (visited[i] === false) {
      let queue = [i];

      while (queue.length > 0) {
        // BFS로 구현했기 때문에, shift()로 후보의 앞에서부터 탐색
        const currentNode = queue.shift();
        visited[currentNode] = true;

        for (const nextNode of graph[currentNode] || []) {
          // 간선이 존재하고 방문하지 않은 경우, 다음 탐색 후보에 추가
          if (
            graph[nextNode] &&
            check[nextNode][currentNode] &&
            !visited[nextNode]
          ) {
            queue.push(nextNode);
          }
        }
      }

      cnt++;
    }
  }
  console.log(cnt - 1);
  process.exit();
});
