const Doliente = require("../models/doliente.model.js");

// Create and Save a new Customer
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  // Create a Customer
  const doliente = new Doliente({
    id_doliente: req.body.id_doliente,
	id_voluntario: req.body.id_voluntario,
	marca_temporal: req.body.marca_temporal,
	clave_de_registro: req.body.clave_de_registro,
	primer_nombre: req.body.primer_nombre,
	apellido_paterno: req.body.apellido_paterno,
	edad: req.body.edad,
	ciudad_pais: req.body.ciudad_pais,
	numero_celular: req.body.numero_celular,
	correo: req.body.correo,
	liga_url: req.body.liga_url,
	liga_id: req.body.liga_id,
	liga_password: req.body.liga_password,
	preferencia_de_horario: req.body.preferencia_de_horario,
	medio_de_enterarse: req.body.medio_de_enterarse,
	quieres_recibir_info: req.body.quieres_recibir_info,
  });

  // Save Customer in the database
  Doliente.create(doliente, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Doliente."
      });
    // else res.send(data);
	  else {
		  req.flash('succes','El doliente se ha guardado');
		  // res.redirect('/examples')
	  }
  });
};

// Retrieve all Customers from the database.
exports.findAll = (req, res) => {
  Doliente.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving dolientes."
      }); 
    else {
		var vsession = req.session;
		// res.render('example/all',{ data, vsession });
	}
  });
};

// Find a single Customer with a customerId
exports.findOne = (req, res) => {
  Doliente.findById(req.params.id_doliente, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Doliente with id ${req.params.id_doliente}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Doliente with id " + req.params.id_doliente
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
  Doliente.updateById(
    req.params.id_doliente,
    new Doliente(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Doliente with id ${req.params.id_doliente}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating Doliente with id " + req.params.id_doliente
          });
        }
      } 
		else {
			req.flash('succes','El doliente se ha actualizado');
			// res.redirect('/examples/'+req.params.example);
		}
    }
  );
};

// Delete a Customer with the specified customerId in the request
exports.delete = (req, res) => {
  Doliente.remove(req.params.id_doliente, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Doliente with id ${req.params.id_doliente}.`
        });
      } else {
        res.status(500).send({
          message: "Could not delete Doliente with id " + req.params.id_doliente
        });
      }
    } 
	  else {
		  req.flash('del','El doliente se ha borrado');
		  // res.redirect('/examples')
	  }
  });
};

// Delete all Customers from the database.
exports.deleteAll = (req, res) => {
  Doliente.removeAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all dolientes."
      });
   // else res.send({ message: `All Examples were deleted successfully!` });
	  else {
		  req.flash('del','Se ha borrado todo con exito');
		  // res.redirect('/examples')
	  }
  });
};