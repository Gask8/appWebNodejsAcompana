module.exports = app => {
	const doliente = require("../controllers/doliente.controller.js");
	const mw = require("./middelware.js");
	
	const express = require('express');
	const router = express.Router();
	app.use('/doliente', router);

	// ALL Get
	router.get("/", mw.isLogIn, doliente.findAll);

	// NEW Get
	router.get("/nuevo", mw.isLogIn, doliente.findAllNew);

	// NEW Post
	router.post('/', doliente.create);
	
	// ALL Delete
	router.delete("/", mw.isLogIn, doliente.deleteAll);
	
	// ByID GET
	router.get("/:id", mw.isLogIn, doliente.findOne);
	
	// AddInfo ByID GET
	router.get("/addInfo/:id", mw.isLogIn, doliente.findOneAdd);

	// AddInfo ByID PUT
	router.put("/addInfo/:id", mw.isLogIn, doliente.updateAdd);

	// ByID PUT
	router.put("/:id", mw.isLogIn, doliente.update);

	// ByID DELETE
	router.delete("/:id", mw.isLogIn, doliente.delete);

};