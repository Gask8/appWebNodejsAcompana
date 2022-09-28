module.exports = app => {
  const examples = require("../controllers/example.controller.js");
	
	//ROUTER MIDDELWARE
	const express = require('express');
	const router = express.Router();
	const isLogIn = (req, res, next) => {
		if(req.session.email == undefined){
			req.flash('wrong','Debe Ingresar como Usuario')
			return res.redirect('/')
		}
		next();
	}
	app.use('/', router);
	
  //new
  router.get('/examples/new',isLogIn, (req,res)=>{
	  var vsession = req.session;
	  // res.render('example/new',{vsession})
  })
	
  // Create a new Customer
  app.post("/examples", examples.create);

  // Retrieve all Customers
  router.get("/examples", isLogIn, examples.findAll);

  // Retrieve a single Customer with customerId
  router.get("/examples/:exampleId", isLogIn, examples.findOne);

  // Update a Customer with customerId
  app.put("/examples/:exampleId", examples.update);

  // Delete a Customer with customerId
  app.delete("/examples/:exampleId", examples.delete);

  // Create a new Customer
  app.delete("/examples", examples.deleteAll);
};