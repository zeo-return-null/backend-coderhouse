const products = [
	{ 
		id:1,
		name: "Escuadra", 
		price: 323.45 
	},
	{ 
		id:2,
		name: "Calculadora", 
		price: 234.56 
	},
	{ 
		id:3,
		name: "Globo Terraqueo", 
		price: 45.67 
	},
	{ 
		id:4,
		name: "Paleta Pintura", 
		price: 456.78 
	},
	{ 
		id:5,
		name: "Reloj", 
		price: 67.89 
	},
	{ 
		id:6,
		name: "Agenda", 
		price: 78.90 
	} 

]

const getProductsInfo = (products) => {
	const listAsAString = products.map(item => item.name).join(",");
	return listAsAString;
}

const totalPrice = (products) => {
	const total = products.reduce((initialValue, product) => {
		return initialValue + product.price;
	}, 0);
	return total;
}

const average = (products) => {
	return Math.floor(totalPrice(products)/products.length);
}

const cheaperProduct = (products) => {
	const cheapest = products.reduce((initialValue, product) =>{
		if(!initialValue) return product.price;
		else {
			if(initialValue.price < product.price) return initialValue;
			return product;
		}
	}, {})
	return cheapest;
} 

const expensiveProduct = (products) => {
	const expensive = products.reduce((initialValue, product) =>{
		if(!initialValue) return product.price;
		else {
			if(initialValue.price > product.price) return initialValue;
			return product;
		}
	}, {})
	return expensive;
} 

const createObjectWithInfo = (products) => {
	const object = {
		list: getProductsInfo(products),
		total: totalPrice(products),
		average: average(products),
		cheap: cheaperProduct(products),
		expensive: expensiveProduct(products)
	}
	return object;
}

console.log(createObjectWithInfo(products))

