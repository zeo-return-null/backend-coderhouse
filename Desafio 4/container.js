module.exports = class Container {
	constructor() {
		this.container = [];
	}

	/**
	 * Guarda agrega un producto
	 * @param {string} product
	 * @returns Id del producto
	 */
	save(product) {
		try {
			let length = this.container.length;
			let index = 0;
			if (length == 0) {
				index = 1;
			} else {
				index = this.container[length - 1].id + 1;
			}
			product.id = index;
			this.container.push(product);
			return product.id;
		} catch (error) {
			throw error;
		}
	}

	/**
	 * Busca un producto
	 * @param {int} id
	 * @returns Devuelve el producto si existe
	 */
	getById(id) {
		try {
			let productsArray = this.container.filter((x) => {
				return x.id == id;
			});
			if (productsArray[0] == undefined) {
				return { error: "producto no encontrado" };
			} else {
				return productsArray;
			}
		} catch (error) {
			throw error;
		}
	}

	/**
	 * Busca un producto y lo edita
	 * @param {int} id
	 * @returns Devuelve el producto si existe
	 */
	updateById(product) {
		try {
			let objIndex = this.container.findIndex(
				(product) => product.id == product.id
			);

			if (objIndex == -1) {
				return { error: "producto no encontrado" };
			} else {
				this.container[objIndex].title = product.title;
				this.container[objIndex].price = product.price;
				this.container[objIndex].thumbnail = product.thumbnail;

				return { estado: "Producto actualizado" };
			}
		} catch (error) {
			throw error;
		}
	}

	/**
	 *
	 * @returns Devuelve todos los productos
	 */
	getAll() {
		try {
			return this.container;
		} catch (error) {
			throw error;
		}
	}

	/**
	 * Borra el producto con el id ingresado
	 * @param {int} id
	 */
	deleteById(id) {
		try {
			let product = this.getById(id);
			console.log(product.error != "");
			if (product.error == "") {
				return product;
			} else {
				this.container = this.container.filter((x) => {
					return x.id != id;
				});
				return { deletedProductId: id };
			}
		} catch (error) {
			throw error;
		}
	}
};
