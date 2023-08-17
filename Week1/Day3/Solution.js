const readline = require('readline');
let rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout,
});
let lines = [];
rl.on('line', (line) => {
	lines.push(line.split(" "))
});

rl.on('close', () => {
	let res = 0
	for (let i=1; i<= Number(lines[0]); i++) {
		if (lines[i][1] === "+") res += Number(lines[i][0]) + Number(lines[i][2])
		if (lines[i][1] === "-") res += Number(lines[i][0]) - Number(lines[i][2])
		if (lines[i][1] === "*") res += Number(lines[i][0]) * Number(lines[i][2])
		if (lines[i][1] === "/") res += Math.floor(Number(lines[i][0]) / Number(lines[i][2]))
	}
	
	console.log(res)
})
