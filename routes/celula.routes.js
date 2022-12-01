module.exports = app => {
	const celula = require("../controllers/celula.controller.js");
	const mw = require("./middelware.js");
	
	const express = require('express');
	const router = express.Router();
	app.use('/celula', mw.isLogIn, router);

	// ALL Get
	router.get("/", celula.findAll);

	// NEW Get
	router.get('/nuevo', (req,res)=>{
		var vsession = req.session; res.render('celula/form', {vsession})
	})
	// NEW Post
	router.post('/', celula.create);
	
	// ALL Delete
	router.delete("/", celula.deleteAll);
	
	// ByID GET
	router.get("/:id", celula.findOne);
	
	// ByID PUT
	router.put("/:id", celula.update);

	// ByID DELETE
	router.delete("/:id", celula.delete);

};