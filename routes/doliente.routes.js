module.exports = app => {
	const doliente = require("../controllers/doliente.controller.js");
	const mw = require("./middelware.js");
	
	const express = require('express');
	const router = express.Router();
	app.use('/doliente', mw.isLogIn, router);

	// ALL Get
	router.get("/", doliente.findAll);

	// NEW Get
	router.get("/nuevo", doliente.findAllNew);

	// NEW Post
	router.post('/', doliente.create);
	
	// ALL Delete
	router.delete("/", doliente.deleteAll);
	
	// ByID GET
	router.get("/:id", doliente.findOne);
	
	// ByID PUT
	router.put("/:id", doliente.update);

	// ByID DELETE
	router.delete("/:id", doliente.delete);

};