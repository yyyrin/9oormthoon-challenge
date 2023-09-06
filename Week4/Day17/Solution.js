const readline = require("readline");

let rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let lines = [];

rl.on("line", (line) => {
  lines.push(line.split(" ").map(Number));
}).on("close", () => {
  const [N, M] = lines[0]; // 컴퓨터의 개수, 통신 회선의 개수
  const graph = {};

  // 양방향 그래프 생성
  for (let i = 1; i <= M; i++) {
    const [a, b] = lines[i];
    if (!(a in graph)) graph[a] = [];
    if (!(b in graph)) graph[b] = [];

    graph[a].push(b);
    graph[b].push(a);
  }

  const visited = new Array(N + 1).fill(false);
  const result = []; // 정답 저장할 배열
  let density = 0; // 밀도

  // DFS
  for (let i = 1; i <= N; i++) {
    // 방문한 적 없는 경우 탐색
    if (!visited[i]) {
      const queue = [i];
      const component = new Set();

      // 시작 노드에서 출발했을 때
      // 포함될 수 있는 모든 컴포넌트 확인
      while (queue.length > 0) {
        const now = queue.pop();

        if (!visited[now]) {
          visited[now] = true;
          component.add(now);
          if (graph[now]) {
            for (const to of graph[now]) {
              if (!visited[to]) {
                queue.push(to);
              }
            }
          }
        }
      }

      let edge = 0; // 간선의 수

      // 컴포넌트에 속한 모든 컴퓨터에 대해 순회
      for (const j of component) {
        if (graph[j]) {
          // 도달 가능한 컴퓨터 중에서
          for (const to of graph[j]) {
            // 해당 컴포넌트에 속한다면 컴포넌트 내부의 통신 회선
            if (component.has(to)) {
              edge += 1;
            }
          }
        }
      }
      
      // 현재 컴포넌트의 밀도 계산
      const tempDensity = edge / component.size;
      
      // 현재 컴포넌트의 밀도와 이전까지 최고 밀도가 같은 경우 2번 조건 고려
      if (Math.abs(tempDensity - density) < 1e-8) {
        // 만약 현재 컴포넌트 배열이 이전의 결과보다 크다면
        // 결과를 현재 컴포넌트로 갱신
        // 만약 현재 컴포넌트와 이전 결과의 크기가 같다면
        // 컴포넌트 내의 첫 번쨰 컴퓨터 번호를 비교하여 더 작은 값을 가진 컴포넌트를 결과로 선택
        if (
          component.size > result.length ||
          (component.size === result.length && i < result[0])
        ) {
          result.length = 0;
          Array.prototype.push.apply(result, Array.from(component));
          density = tempDensity;
        }
      }
      // 만약 현재 컴포넌트의 밀도가 이전까지의 최고 밀도보다 크다면
      // 결과를 현재 컴포넌트로 갱신
      else if (tempDensity > density) {
        result.length = 0;
        Array.prototype.push.apply(result, Array.from(component));
        density = tempDensity;
      }
    }
  }

  result.sort((a, b) => a - b);
  console.log(result.join(" "));
});
