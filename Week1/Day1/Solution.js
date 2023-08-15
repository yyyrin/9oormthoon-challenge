const readline = require('readline');
let rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout,
});
let input = [];
rl.on('line', (line) => {
	input = line.split(" ").map(Number);
	rl.close();
});

rl.on('close', () => {
	let res = input[0] * (1 + input[1]/30)
	console.log(Math.floor(res))
	process.exit();
})
