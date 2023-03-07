module.exports = app => {
	const aporte = require("../controllers/aporte.controller.js");
	const doliente = require("../controllers/doliente.controller.js");
	const mw = require("./middelware.js");
	
	const express = require('express');
	const router = express.Router();
	app.use('/aporte', mw.isLogIn, router);

	// ALL Get
	router.get("/", aporte.findAll);

	// NEW Get
	router.get('/nuevo', doliente.aportesAll);
	
	// NEW Post
	router.post('/', aporte.create);
	
	// ALL Delete
	router.delete("/", aporte.deleteAll);
	
	// ByID GET
	router.get("/:id", aporte.findOne);
	
	// ByID PUT
	router.put("/:id", aporte.update);

	// ByID DELETE
	router.delete("/:id", aporte.delete);

};
