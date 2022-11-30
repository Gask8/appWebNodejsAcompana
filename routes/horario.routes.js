module.exports = app => {
	const horario = require("../controllers/horario.controller.js");
	const voluntario = require("../controllers/voluntario.controller.js");
	const express = require('express');

	const isLogIn = (req, res, next) => {
		if(req.session.email == undefined){
			req.flash('wrong','Debe Ingresar como Usuario')
			return res.redirect('/')
		}
		next();
	}

	const router = express.Router();
	app.use('/horario', router);


	// ALL Get
	router.get("/", isLogIn, horario.findAll);

	// NEW Get
	router.get('/nuevo', isLogIn, voluntario.horariosAll);

	// ALL Get for Voluntarisos
	router.get("/voluntarios/:id", isLogIn, horario.findAllForVol);
	
	// NEW Post
	router.post('/', horario.create);
	
	// ALL Delete
	router.delete("/", horario.deleteAll);
	
	// ByID GET
	router.get("/:id", isLogIn, horario.findOne);
	
	// ByID PUT
	router.put("/:id", horario.update);

	// ByID DELETE
	router.delete("/:id", horario.delete);

};