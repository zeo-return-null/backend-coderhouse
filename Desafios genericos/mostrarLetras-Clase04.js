const showChars = (message, interval, callback) => {
	let actualPosition = 0;
	const intervalId = setInterval(() => {
		console.log(message[actualPosition]);
		actualPosition++;
		if ( actualPosition == message.length) {
			clearInterval(intervalId);
			callback();
		}
	}, interval);
};

showChars("Texto de ejemplo rapido", 0, () => console.log("Terminé de mostrar caracteres"))
showChars("Texto de ejemplo", 250, () => console.log("Terminé de mostrar caracteres"))
showChars("Segundo texto de ejemplo", 500, () => console.log("Terminé de mostrar caracteres"))