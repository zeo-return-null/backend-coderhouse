function randomNumber(min, max) {
	let result = {};
	for (let i = 0; i < 9999; i++) {
		const random =  Math.floor((Math.random()  * (max - min)) + min);
		if (result[random]) result[random]++;
	else result[random] = 1;
	}	
	return result;
}

console.log(randomNumber(1, 20))

