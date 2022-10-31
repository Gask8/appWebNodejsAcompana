module.exports = app => {
	const escucha = require("../controllers/escucha.controller.js");
	const express = require('express');
	const router = express.Router();
	app.use('/escucha', router);

	// ALL Get
	router.get("/", escucha.findAll);

	// NEW Get
	router.get('/nuevo', (req,res)=>{
		res.render('escucha/form')
	})
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