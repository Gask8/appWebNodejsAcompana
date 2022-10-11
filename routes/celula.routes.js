module.exports = app => {
	const celula = require("../controllers/celula.controller.js");
	const express = require('express');
	const router = express.Router();
	app.use('/celula', router);

	// ALL Get
	router.get("/", celula.findAll);

	// NEW Get
	router.get('/nuevo', (req,res)=>{
		res.render('celula/form')
	})
	// NEW Post
	router.post('/', celula.create);
	
	// ALL Delete
	router.delete("/", celula.deleteAll);

};