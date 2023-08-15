const readline = require('readline');
let rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout,
});
let input = [];
rl.on('line', (line) => {
	// input.push(line.split(" ").map(Number));
	input = [...input, ...line.split(" ").map(Number)]
});

rl.on('close', () => {
	let hour = input[1]
	let minute = input[2]
	for (let i=3; i<input.length; i++) {
		minute += input[i]
	}

	if (minute >= 60) {
			hour += Math.floor(minute/60)
			minute = minute%60
		}
	if (hour > 23) hour = hour % 24
	console.log(hour, minute)
	process.exit();
})
