const readline = require("readline");

let rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let input = [];

rl.on("line", (line) => {
  input.push(line.split(" ").map(Number));
}).on("close", () => {
  // 도시의 수, 도로의 수, 출발 도시, 도착 도시
  const [N, M, S, E] = input[0];
  const graph = {};

  // 양방향 그래프 만들기
  for (let i = 1; i <= M; i++) {
    const [a, b] = input[i];
    if (!graph[a]) graph[a] = [];
    if (!graph[b]) graph[b] = [];

    graph[a].push(b);
    graph[b].push(a);
  }

  // S번 ~ N번 도시별로 공사 중
  for (let off = 1; off <= N; off++) {
    // S도시나 E도시에서 공사하는 경우 처리
    if (off === S || off === E) {
      console.log(-1);
    } else {
      // 노드별로 해당 경로 중 몇 번째 방문인지 표시
      const visited = new Array(N + 1).fill(0);
      let queue = [S];
      visited[S] = 1;

      while (queue.length > 0) {
        let currentNode = queue.shift();
        if (graph[currentNode]) {
          for (let nextNode of graph[currentNode]) {
            // 다음 노드가 공사중이 아니고, 방문하지 않았다면
            if (nextNode !== off && !visited[nextNode]) {
              visited[nextNode] += visited[currentNode] + 1;
              queue.push(nextNode);
            }
            // 다음 노드가 E라면 탐색 종료
            if (nextNode === E) break;
          }
        }
      }

      // E번 도시에 방문하지 않았다면 -1 출력
      console.log(!visited[E] ? -1 : visited[E]);
    }
  }
});
