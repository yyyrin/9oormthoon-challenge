const readline = require("readline");

let rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let lines = [];

rl.on("line", (line) => {
  lines.push(line);
}).on("close", () => {
  const str = lines[1];
  let caseArr = [];

  // 모든 경우의 수 구하는 함수
  function getSubStrings(str) {
    for (let i = 1; i < str.length - 1; i++) {
      for (let j = i + 1; j < str.length; j++) {
        const first = str.substring(0, i);
        const second = str.substring(i, j);
        const third = str.substring(j);

        caseArr.push([first, second, third]);
      }
    }
  }

  getSubStrings(str);

  // 중복 제거하여 오름차순으로 정렬
  let substringArr = Array.from(new Set(caseArr.flat())).sort();

  // 모든 경우의 수의 점수 구하기
  let maxArr = caseArr.map((element) => {
    return element.reduce((acc, cur) => {
      acc += substringArr.indexOf(cur) + 1;
      return acc;
    }, 0);
  });

  // 점수 최댓값 출력
  console.log(Math.max(...maxArr));
  process.exit();
});
