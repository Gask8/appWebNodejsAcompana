module.exports = app => {
	const aporte = require("../controllers/aporte.controller.js");
	const doliente = require("../controllers/doliente.controller.js");
	const express = require('express');
	const router = express.Router();

	const isLogIn = (req, res, next) => {
		if(req.session.email == undefined){
			req.flash('wrong','Debe Ingresar como Usuario')
			return res.redirect('/')
		}
		next();
	}

	app.use('/aporte', router);

	// ALL Get
	router.get("/", isLogIn, aporte.findAll);

	// NEW Get
	router.get('/nuevo', isLogIn, doliente.aportesAll);
	
	// NEW Post
	router.post('/', aporte.create);
	
	// ALL Delete
	router.delete("/", aporte.deleteAll);
	
	// ByID GET
	router.get("/:id", isLogIn, aporte.findOne);
	
	// ByID PUT
	router.put("/:id", aporte.update);

	// ByID DELETE
	router.delete("/:id", aporte.delete);

};
