const readline = require("readline");

let rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let lines = [];

rl.on("line", (line) => {
  lines.push(line.split(" ").map(Number));
}).on("close", () => {
  const [N, M, K] = lines[0]; // 노드의 개수 / 간선의 개수 / 시작 노드의 번호
  const edges = lines.slice(1); // 간선 양끝 정점의 번호
  let visited = new Set(); // 방문한 노드
  let cnt = 0; // 방문한 노드 개수
  let currentNode = K; // 현재 위치

  // 각 노드에 연결된 노드의 목록 만들기
  let adjList = Array.from({ length: N + 1 }, () => []);
  for (let i = 0; i < M; i++) {
    const [node1, node2] = edges[i];
    adjList[node1].push(node2);
    adjList[node2].push(node1);
  }

  while (!visited.has(currentNode)) {
    visited.add(currentNode);
    cnt++;

    // 방문할 수 있는 노드 찾기
    const neighbors = adjList[currentNode];
    const unvisitedNeighbors = neighbors.filter((e) => !visited.has(e));

    // 방문할 수 있는 노드가 없는 경우
    if (unvisitedNeighbors.length < 1) break;
    // 방문할 수 있으면서 번호가 가장 작은 노드로 현재 노드 갱신
    currentNode = Math.min(...unvisitedNeighbors);
  }

  console.log(`${cnt} ${currentNode}`);
  process.exit();
});
