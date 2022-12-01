module.exports = app => {
	const horario = require("../controllers/horario.controller.js");
	const voluntario = require("../controllers/voluntario.controller.js");
	const mw = require("./middelware.js");
	
	const express = require('express');
	const router = express.Router();
	app.use('/horario', mw.isLogIn, router);


	// ALL Get
	router.get("/", horario.findAll);

	// NEW Get
	router.get('/nuevo', voluntario.horariosAll);

	// ALL Get for Voluntarisos
	router.get("/voluntarios/:id", horario.findAllForVol);
	
	// NEW Post
	router.post('/', horario.create);
	
	// ALL Delete
	router.delete("/", horario.deleteAll);
	
	// ByID GET
	router.get("/:id", horario.findOne);
	
	// ByID PUT
	router.put("/:id", horario.update);

	// ByID DELETE
	router.delete("/:id", horario.delete);

};