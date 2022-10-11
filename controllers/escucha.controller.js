const Escucha = require("../models/escucha.model.js");

// Create and Save a new Customer
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  // Create a Customer
  const escucha = new Escucha({
	id_escucha: req.body.id_escucha,
    id_doliente: req.body.id_doliente,
    id_voluntario: req.body.id_voluntario,
	fecha: req.body.fecha,
	hora_termino: req.body.hora_termino,
	se_cumplio: req.body.se_cumplio,
	comentario: req.body.comentario,
  });

  // Save Customer in the database
  Escucha.create(escucha, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Escucha."
      });
    // else res.send(data);
	  else {
		  req.flash('succes','La escucha se ha guardado');
		  // res.redirect('/escuchas')
	  }
  });
};

// Retrieve all Customers from the database.
exports.findAll = (req, res) => {
  Escucha.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving escuchas."
      }); 
    else {
		var vsession = req.session;
		// res.render('example/all',{ data, vsession });
	}
  });
};

// Find a single Customer with a customerId
exports.findOne = (req, res) => {
  Escucha.findById(req.params.id_escucha, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Escucha with id ${req.params.id_escucha}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Escucha with id " + req.params.id_escucha
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
  Escucha.updateById(
    req.params.id_escucha,
    new Escucha(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Escucha with id ${req.params.id_escucha}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating Escucha with id " + req.params.id_escucha
          });
        }
      } 
		else {
			req.flash('succes','El escucha se ha actualizado');
			// res.redirect('/examples/'+req.params.example);
		}
    }
  );
};

// Delete a Customer with the specified customerId in the request
exports.delete = (req, res) => {
  Escucha.remove(req.params.id_escucha, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Escucha with id ${req.params.id_escucha}.`
        });
      } else {
        res.status(500).send({
          message: "Could not delete Escucha with id " + req.params.id_escucha
        });
      }
    } 
	  else {
		  req.flash('del','La escucha se ha borrado');
		  // res.redirect('/examples')
	  }
  });
};

// Delete all Customers from the database.
exports.deleteAll = (req, res) => {
  Escucha.removeAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all escuchas."
      });
   // else res.send({ message: `All Examples were deleted successfully!` });
	  else {
		  req.flash('del','Se ha borrado todo con exito');
		  // res.redirect('/examples')
	  }
  });
};