module.exports = app => {
	const canalizado = require("../controllers/canalizado.controller.js");
	const doliente = require("../controllers/doliente.controller.js");
	const mw = require("./middelware.js");
	
	const express = require('express');
	const router = express.Router();
	app.use('/canalizado', mw.isLogIn, router);

	// ALL Get
	router.get("/", canalizado.findAll);

	// NEW Get
	router.get('/nuevo', doliente.canalizadosAll);
	
	// NEW Post
	router.post('/', canalizado.create);
	
	// ALL Delete
	router.delete("/", canalizado.deleteAll);
	
	// ByID GET
	router.get("/:id", canalizado.findOne);
	
	// ByID PUT
	router.put("/:id", canalizado.update);

	// ByID DELETE
	router.delete("/:id", canalizado.delete);

};
