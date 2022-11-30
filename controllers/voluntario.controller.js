const Voluntario = require("../models/voluntario.model.js");

// CREATE ELEMENT
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Contenido no puede estar vacio!"
    });
  }

  // Create JSON
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

  // Save in the database
  Voluntario.create(voluntario, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Error al crear una voluntario"
      });
	  else {
		  req.flash('succes','La voluntario se ha guardado');
		  res.redirect('/voluntario')
	  }
  });
};

// GET ALL ELEMENTS.
exports.findAll = (req, res) => {
  Voluntario.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Error al regresar voluntario de la BD"
      }); 
    else {
		var vsession = req.session;
		res.render('voluntario/list',{ data, vsession });
	}
  });
};

// FIND BY ID
exports.findOne = (req, res) => {
  Voluntario.findById(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `No se encontro voluntario con id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "Error consiguiendo voluntario con id " + req.params.id
        });
      }
    } 
	  // else res.send(data);
	 else {
		var vsession = req.session;
		res.render('voluntario/byId',{ data, vsession });
	}
  });
};

// UPDATRE BY ID
exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Contenido no puede estar vacio!"
    });
  }
  Voluntario.updateById(
    req.params.id,
    new Voluntario(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `No se encontro voluntario con id ${req.params.id}.`
          });
        } else {
          res.status(500).send({
            message: "Error actializando voluntario con id " + req.params.id
          });
        }
      } 
		else {
			req.flash('succes','La voluntario se ha actualizado');
			res.redirect('/voluntario/'+req.params.id);
		}
    }
  );
};

// DELETE BYID
exports.delete = (req, res) => {
  Voluntario.remove(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `No se encontro voluntario con id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "No se pudo borrar voluntario con id " + req.params.id
        });
      }
    } 
	  else {
		  req.flash('succes','El voluntario se ha borrado');
		  res.redirect('/voluntario')
	  }
  });
};

// DELETE ALL
exports.deleteAll = (req, res) => {
  Voluntario.removeAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Error Borrando todas las Voluntarios"
      });
	  else {
		  req.flash('succes','Se ha borrado todo con exito');
		  res.redirect('/voluntario')
	  }
  });
};

// GET ALL - FOR HORARIO FORM
exports.horariosAll = (req, res) => {
  Voluntario.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Error al regresar horario de la BD"
      }); 
    else {
		var vsession = req.session;
		res.render('horario/form',{ data, vsession });
	}
  });
};