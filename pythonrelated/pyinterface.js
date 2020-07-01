const spawn = require('child_process').spawn;
const run = (args) => {
	return new Promise((resolve, reject) => {
		const file = __dirname + '\\model.py';
		const process = spawn('python', [file, ...args]);
		const out = [];
		process.stdout.on('data', (data) => {
			console.log(data.toString(), 'here');
			out.push(data.toString());
		});
		process.on('exit', (code, signal) => {
			console.log(code);
			resolve(out);
		});
	});
};

module.exports = run;
