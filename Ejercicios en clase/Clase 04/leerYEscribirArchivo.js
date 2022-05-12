const fs = require('fs');


// Welcome to CALLBACK HELL 
fs.stat('package.json', (error, stats) => {
	const size = stats.size;
	fs.readFile('package.json', 'utf-8',(error, data) => {
		const info = {
			strContent: data,
			objContent: JSON.parse(data),
			size: size
		};
		fs.writeFile('info.txt', JSON.stringify(info), (error) => {
			console.log("operacion finalizada.")
		})
	})
})
