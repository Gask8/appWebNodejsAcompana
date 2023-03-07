module.exports = app => {
	const escucha = require("../controllers/escucha.controller.js");
	const doliente = require("../controllers/doliente.controller.js");
	const mw = require("./middelware.js");
	
	const express = require('express');
	const router = express.Router();
	app.use('/escucha', mw.isLogIn,router);

	// ALL Get
	router.get("/todas", escucha.findAll);

	// ALL Get
	router.get("/", escucha.findAllToday);

	// NEW Get
	router.get('/nuevo', doliente.dolientesVoluntariosAll);

	// NEW Post
	router.post('/reminder', escucha.reminder);

	// NEW Post
	router.post('/', escucha.create);
	
	// ALL Delete
	router.delete("/", escucha.deleteAll);
	
	// ByID GET
	router.get("/:id", escucha.findOne);
	
	// ByID PUT
	router.put("/:id", escucha.update);

	// ByID DELETE
	router.delete("/:id", escucha.delete);

};