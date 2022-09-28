const Example = require("../models/example.model.js");

// Create and Save a new Customer
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  // Create a Customer
  const example = new Example({
    nombre: req.body.nombre,
    rfc: req.body.rfc,  
  });

  // Save Customer in the database
  Example.create(example, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Example."
      });
    // else res.send(data);
	  else {
		  req.flash('succes','El example se ha guardado');
		  // res.redirect('/examples')
	  }
  });
};

// Retrieve all Customers from the database.
exports.findAll = (req, res) => {
  Example.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving examples."
      }); 
    else {
		var vsession = req.session;
		// res.render('example/all',{ data, vsession });
	}
  });
};

// Find a single Customer with a customerId
exports.findOne = (req, res) => {
  Example.findById(req.params.exampleId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Example with id ${req.params.exampleId}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Example with id " + req.params.exampleId
        });
      }
    } 
	  // else res.send(data);
	 else {
		var vsession = req.session;
		// res.render('example/byId',{ data, vsession });
	}
  });
};

// Update a Customer identified by the customerId in the request
exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }
  Example.updateById(
    req.params.exampleId,
    new Example(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Example with id ${req.params.exampleId}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating Example with id " + req.params.exampleId
          });
        }
      } 
		else {
			req.flash('succes','El example se ha actualizado');
			// res.redirect('/examples/'+req.params.exampleId);
		}
    }
  );
};

// Delete a Customer with the specified customerId in the request
exports.delete = (req, res) => {
  Example.remove(req.params.exampleId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Example with id ${req.params.exampleId}.`
        });
      } else {
        res.status(500).send({
          message: "Could not delete Example with id " + req.params.exampleId
        });
      }
    } 
	  else {
		  req.flash('del','El example se ha borrado');
		  // res.redirect('/examples')
	  }
  });
};

// Delete all Customers from the database.
exports.deleteAll = (req, res) => {
  Example.removeAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all examples."
      });
   // else res.send({ message: `All Examples were deleted successfully!` });
	  else {
		  req.flash('del','Se ha borrado todo con exito');
		  // res.redirect('/examples')
	  }
  });
};