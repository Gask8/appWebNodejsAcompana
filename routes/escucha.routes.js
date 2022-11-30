module.exports = app => {
	const escucha = require("../controllers/escucha.controller.js");
	const doliente = require("../controllers/doliente.controller.js");
	const express = require('express');

	const isLogIn = (req, res, next) => {
		if(req.session.email == undefined){
			req.flash('wrong','Debe Ingresar como Usuario')
			return res.redirect('/')
		}
		next();
	}

	const router = express.Router();
	app.use('/escucha', router);

	// ALL Get
	router.get("/todas", isLogIn, escucha.findAll);

	// ALL Get
	router.get("/", isLogIn, escucha.findAllToday);

	// NEW Get
	router.get('/nuevo', isLogIn, doliente.dolientesVoluntariosAll);

	// NEW Post
	router.post('/reminder', escucha.reminder);

	// NEW Post
	router.post('/', escucha.create);
	
	// ALL Delete
	router.delete("/", escucha.deleteAll);
	
	// ByID GET
	router.get("/:id", isLogIn, escucha.findOne);
	
	// ByID PUT
	router.put("/:id", escucha.update);

	// ByID DELETE
	router.delete("/:id", escucha.delete);

};