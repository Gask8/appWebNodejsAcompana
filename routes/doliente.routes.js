module.exports = app => {
	const doliente = require("../controllers/doliente.controller.js");
	const express = require('express');
	const router = express.Router();
	app.use('/doliente', router);

	// ALL Get
	router.get("/", doliente.findAll);

	// NEW Get
	router.get('/nuevo', (req,res)=>{
		res.render('doliente/form')
	})
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