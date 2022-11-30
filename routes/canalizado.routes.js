module.exports = app => {
	const canalizado = require("../controllers/canalizado.controller.js");
	const doliente = require("../controllers/doliente.controller.js");
	const express = require('express');

	const isLogIn = (req, res, next) => {
		if(req.session.email == undefined){
			req.flash('wrong','Debe Ingresar como Usuario')
			return res.redirect('/')
		}
		next();
	}

	const router = express.Router();
	app.use('/canalizado', router);

	// ALL Get
	router.get("/", isLogIn, canalizado.findAll);

	// NEW Get
	router.get('/nuevo', isLogIn, doliente.canalizadosAll);
	
	// NEW Post
	router.post('/', canalizado.create);
	
	// ALL Delete
	router.delete("/", canalizado.deleteAll);
	
	// ByID GET
	router.get("/:id", isLogIn, canalizado.findOne);
	
	// ByID PUT
	router.put("/:id", canalizado.update);

	// ByID DELETE
	router.delete("/:id", canalizado.delete);

};
