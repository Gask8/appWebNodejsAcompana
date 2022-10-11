const Horario = require("../models/horario.model.js");

// Create and Save a new Customer
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  // Create a Customer
  const horario = new Horario({
    id_horario: req.body.id_horario,
	id_voluntario: req.body.id_voluntario,
	hora_comienzo: req.body.hora_comienzo,
	hora_termino: req.body.hora_termino,
	dia_semana: req.body.dia_semana,
  });

  // Save Customer in the database
  Horario.create(horario, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Horario."
      });
    // else res.send(data);
	  else {
		  req.flash('succes','El horario se ha guardado');
		  // res.redirect('/examples')
	  }
  });
};

// Retrieve all Customers from the database.
exports.findAll = (req, res) => {
  Horario.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving horarios."
      }); 
    else {
		var vsession = req.session;
		// res.render('example/all',{ data, vsession });
	}
  });
};

// Find a single Customer with a customerId
exports.findOne = (req, res) => {
  Horario.findById(req.params.id_horario, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Horario with id ${req.params.id_horario}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Horario with id " + req.params.id_horario
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
  Horario.updateById(
    req.params.id_horario,
    new Horario(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Horario with id ${req.params.id_horario}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating Horario with id " + req.params.id_horario
          });
        }
      } 
		else {
			req.flash('succes','El horario se ha actualizado');
			// res.redirect('/examples/'+req.params.example);
		}
    }
  );
};

// Delete a Customer with the specified customerId in the request
exports.delete = (req, res) => {
  Horario.remove(req.params.id_horario, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Horario with id ${req.params.id_horario}.`
        });
      } else {
        res.status(500).send({
          message: "Could not delete Horario with id " + req.params.id_horario
        });
      }
    } 
	  else {
		  req.flash('del','El horario se ha borrado');
		  // res.redirect('/examples')
	  }
  });
};

// Delete all Customers from the database.
exports.deleteAll = (req, res) => {
  Horario.removeAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all horarios."
      });
   // else res.send({ message: `All Examples were deleted successfully!` });
	  else {
		  req.flash('del','Se ha borrado todo con exito');
		  // res.redirect('/examples')
	  }
  });
};