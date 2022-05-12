const http = require('http');


const server = http.createServer((req, res) => {
	let time = toLocaleTimeString();
	if (time >= 6 && time <= 12) {
		res.end("Buenos dias");
	}
	else if (time >= 13 && time <= 19) {
		res.end("Buenos tardes");
	}
	else if (time >= 20 && time <= 5){
	res.end("Buenos noches");
	}
})


const connect = server.listen(8080, () => {
	let port = connect.address().port;
	console.log(`escuchando por puerto ${port}`)
})


