const socket = io();

const sendMessage = (ev) => {
	const author =  document.getElementById('author').value;
	const text = document.getElementById('text').value;
	const date = new Date();
	const timestamp = { 
		day: date.getDate(),
		month: date.getMonth()+1,
		year: date.getFullYear(),
		hs: date.getHours(),
		min: date.getMinutes(),
		sec: date.getSeconds()
	}
	const message  = { author, text, timestamp };
	socket.emit('new_message', message);
	document.getElementById("author").value="";
	document.getElementById("text").value="";
	return false;
};
const addProduct = (ev) => {
	const title = document.getElementById("title").value; 
	const price = document.getElementById("price").value; 
	const thumbnail = document.getElementById("thumbnail").value; 
	const product = { title, price, thumbnail };                   
	socket.emit('addProduct', product);                
	document.getElementById("title").value="";
	document.getElementById("price").value="";
	document.getElementById("thumbnail").value="";
	return false;                                       
};

const renderData = (product, message) => {
	fetch('/partials/products.hbs')
	.then((res) => res.text())
	.then((data) => {
		const productTemplate = Handlebars.compile(data);
		const productHtml = productTemplate({
			product: product,
			title: title,
			price: price,
			thumbnail: thumbnail
		});
		document.getElementById('products').innerHTML = productHtml;
	})

	fetch('/partials/messages.hbs')
	.then((res) => res.text())
	.then((data) => {
		const messageTemplate = Handlebars.compile(data);
		const messageHtml = messageTemplate({
			author: author,
			message: message,
			timestamp: timestamp
		})
		document.getElementById('messages').innerHTML = messageHtml;
	})
};

socket.on('messages', (messages) => renderMessages(messages));
