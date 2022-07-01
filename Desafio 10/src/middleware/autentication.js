const autentication = (req, res, next) => {
	req.user = {
		fullName: "Cosme Fulanito",
		isAdmin: false,
	}
	next()
}

const autorization = (req, res, next) => {
	if (req.user.isAdmin) next();
	else res.status(403).send("Vos no tenes permisos campeon");
};

