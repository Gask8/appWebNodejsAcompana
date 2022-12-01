module.exports = app => {
	const voluntario = require("../controllers/voluntario.controller.js");
	const celula = require("../controllers/celula.controller.js");
	const mw = require("./middelware.js");
	
	const express = require('express');
	const router = express.Router();
	app.use('/voluntario', mw.isLogIn, router);

	// ALL Get
	router.get("/", voluntario.findAll);

	// NEW Get
	router.get('/nuevo', celula.voluntariosAll);
	
	// NEW Post
	router.post('/', voluntario.create);
	
	// ALL Delete
	router.delete("/", voluntario.deleteAll);
	
	// ByID GET
	router.get("/:id", voluntario.findOne);
	
	// ByID PUT
	router.put("/:id", voluntario.update);

	// ByID DELETE
	router.delete("/:id", voluntario.delete);

};
