module.exports = app => {
	const celula = require("../controllers/celula.controller.js");
	const express = require('express');
	const router = express.Router();

	const isLogIn = (req, res, next) => {
		if(req.session.email == undefined){
			req.flash('wrong','Debe Ingresar como Usuario')
			return res.redirect('/')
		}
		next();
	}

	app.use('/celula', router);

	// ALL Get
	router.get("/", isLogIn, celula.findAll);

	// NEW Get
	router.get('/nuevo', isLogIn, (req,res)=>{
		var vsession = req.session; res.render('celula/form', {vsession})
	})
	// NEW Post
	router.post('/', celula.create);
	
	// ALL Delete
	router.delete("/", celula.deleteAll);
	
	// ByID GET
	router.get("/:id", isLogIn, celula.findOne);
	
	// ByID PUT
	router.put("/:id", celula.update);

	// ByID DELETE
	router.delete("/:id", celula.delete);

};