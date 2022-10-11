const Voluntario = require("../models/voluntario.model.js");

// Create and Save a new Customer
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  // Create a Customer
  const voluntario = new Voluntario({
    id_voluntario: req.body.id_voluntario,
	id_celula: req.body.id_celula,
	nombre: req.body.nombre,
	apellido: req.body.apellido,
	numero_celular: req.body.numero_celular,
	fecha_nacimiento: req.body.fecha_nacimiento,
	correo: req.body.correo,
	ciudad_pais: req.body.ciudad_pais,
  });

  // Save Customer in the database
  Voluntario.create(voluntario, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Voluntario."
      });
    // else res.send(data);
	  else {
		  req.flash('succes','El voluntario se ha guardado');
		  // res.redirect('/examples')
	  }
  });
};

// Retrieve all Customers from the database.
exports.findAll = (req, res) => {
  Voluntario.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving voluntarios."
      }); 
    else {
		var vsession = req.session;
		// res.render('example/all',{ data, vsession });
	}
  });
};

// Find a single Customer with a customerId
exports.findOne = (req, res) => {
  Voluntario.findById(req.params.id_voluntario, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Voluntario with id ${req.params.id_voluntario}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Voluntario with id " + req.params.id_voluntario
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
  Voluntario.updateById(
    req.params.id_voluntario,
    new Voluntario(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Voluntario with id ${req.params.id_voluntario}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating Voluntario with id " + req.params.id_voluntario
          });
        }
      } 
		else {
			req.flash('succes','El voluntario se ha actualizado');
			// res.redirect('/examples/'+req.params.example);
		}
    }
  );
};

// Delete a Customer with the specified customerId in the request
exports.delete = (req, res) => {
  Voluntario.remove(req.params.id_voluntario, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Voluntario with id ${req.params.id_voluntario}.`
        });
      } else {
        res.status(500).send({
          message: "Could not delete Voluntario with id " + req.params.id_voluntario
        });
      }
    } 
	  else {
		  req.flash('del','El voluntario se ha borrado');
		  // res.redirect('/examples')
	  }
  });
};

// Delete all Customers from the database.
exports.deleteAll = (req, res) => {
  Voluntario.removeAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all voluntarios."
      });
   // else res.send({ message: `All Examples were deleted successfully!` });
	  else {
		  req.flash('del','Se ha borrado todo con exito');
		  // res.redirect('/examples')
	  }
  });
};