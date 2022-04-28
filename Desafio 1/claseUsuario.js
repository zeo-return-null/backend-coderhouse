class Usuario { 
	constructor(nombre, apellido, libros, mascotas) {
		this.nombre = nombre
		this.apellido = apellido
		this.libros = libros
		this.mascotas = mascotas
	}

	getNombreCompleto() {
		return `El nombre completo del usuario es: ${this.nombre} ${this.apellido}`;
	}

	addMascota(string) {
        this.mascotas.push(string)
    }

    countMascotas() {
        return this.mascotas.length
    }

    addLibro(nombre, autor) {
        this.libros.push({nombre: nombre, autor:autor})
    }

    getNombreLibros() {
        this.libros.map(x => x.nombre)
    }
	
	countMascotas() {
		Usuario.contadorDeMascotas = Usuario.contadorDeMascotas + this.mascotas.length
		return `El usuario posee: ${Usuario.contadorDeMascotas} mascotas`
	}
}

const usuarioDePrueba = new Usuario ("Juan", "Sepulveda")

usuarioDePrueba.getNombreCompleto()
usuarioDePrueba.addMascota("Lila")
usuarioDePrueba.addMascota("Zanello")
usuarioDePrueba.countMascotas()
usuarioDePrueba.addLibro("IT", "Stephen King")
usuarioDePrueba.addLibro("El Resplandor", "Stephen King")
usuarioDePrueba.getNombreLibros()
