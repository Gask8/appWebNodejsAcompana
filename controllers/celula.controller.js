const Celula = require("../models/celula.model.js");

// Create and Save a new Customer
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  // Create a Customer
  const celula = new Celula({
	id_celula: req.body.id_celula,
    nombre_celula: req.body.nombre_celula,
    nombre_lider: req.body.nombre_lider,  
  });

  // Save Customer in the database
  Celula.create(celula, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Error al Crear una Celula"
      });
	  else {
		  req.flash('succes','La celula se ha guardado');
		  res.redirect('/celula')
	  }
  });
};

// Retrieve all Customers from the database.
exports.findAll = (req, res) => {
  Celula.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Error al regresar Celula de la BD"
      }); 
    else {
		// var vsession = req.session;
		res.render('celula/list',{ data });
	}
  });
};

// Find a single Customer with a customerId
exports.findOne = (req, res) => {
  Celula.findById(req.params.id_celula, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Celula with id ${req.params.id_celula}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Celula with id " + req.params.id_celula
        });
      }
    } 
	  // else res.send(data);
	 else {
		var vsession = req.session;
		// res.render('celula/byId',{ data, vsession });
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
  Celula.updateById(
    req.params.id_celula,
    new Celula(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Celula with id ${req.params.id_celula}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating Celula with id " + req.params.id_celula
          });
        }
      } 
		else {
			req.flash('succes','El celula se ha actualizado');
			// res.redirect('/examples/'+req.params.id_celula);
		}
    }
  );
};

// Delete a Customer with the specified customerId in the request
exports.delete = (req, res) => {
  Celula.remove(req.params.id_celula, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Celula with id ${req.params.id_celula}.`
        });
      } else {
        res.status(500).send({
          message: "Could not delete Celula with id " + req.params.id_celula
        });
      }
    } 
	  else {
		  req.flash('del','El celula se ha borrado');
		  // res.redirect('/examples')
	  }
  });
};

// Delete all Customers from the database.
exports.deleteAll = (req, res) => {
  Celula.removeAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Error Borrando todas las Celulas"
      });
	  else {
		  req.flash('del','Se ha borrado todo con exito');
		  res.redirect('/celula')
	  }
  });
};