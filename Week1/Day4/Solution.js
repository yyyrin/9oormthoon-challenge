const readline = require('readline');
let rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout,
});
let lines = [];
rl.on('line', (line) => {
	lines.push(line.split(" ").map(Number))
});

rl.on('close', () => {
	let [cnt, flavors] = lines
	let max_idx = flavors.indexOf(Math.max(...flavors))
	let sum_flavors = flavors[max_idx]
	
	for (let i=0; i<cnt; i++) {
		if (i < max_idx) {
			if (flavors[i] <= flavors[i+1]) sum_flavors += flavors[i]
			else {
				console.log(0)
				process.exit()
			}
		}
		if (i > max_idx) {
			if (flavors[i] <= flavors[i-1]) sum_flavors += flavors[i]
			else {
				console.log(0)
				process.exit()
			}
		}
	}
	console.log(sum_flavors)
		process.exit()
})
