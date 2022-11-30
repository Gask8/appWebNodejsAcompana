module.exports = app => {
	const voluntario = require("../controllers/voluntario.controller.js");
	const celula = require("../controllers/celula.controller.js");
	const express = require('express');

	const isLogIn = (req, res, next) => {
		if(req.session.email == undefined){
			req.flash('wrong','Debe Ingresar como Usuario')
			return res.redirect('/')
		}
		next();
	}

	const router = express.Router();
	app.use('/voluntario', router);

	// ALL Get
	router.get("/", isLogIn, voluntario.findAll);

	// NEW Get
	router.get('/nuevo', isLogIn, celula.voluntariosAll);
	
	// NEW Post
	router.post('/', voluntario.create);
	
	// ALL Delete
	router.delete("/", voluntario.deleteAll);
	
	// ByID GET
	router.get("/:id", isLogIn, voluntario.findOne);
	
	// ByID PUT
	router.put("/:id", voluntario.update);

	// ByID DELETE
	router.delete("/:id", voluntario.delete);

};
