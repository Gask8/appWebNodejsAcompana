const Horario = require("../models/horario.model.js");

// CREATE ELEMENT
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Contenido no puede estar vacio!"
    });
  }

  // Create JSON
  const horario = new Horario({
	id_horario: req.body.id_horario,	  
	id_voluntario: req.body.id_voluntario,
  	hora_comienzo: req.body.hora_comienzo,
  	hora_termino: req.body.hora_termino,
  	dia_semana: req.body.dia_semana,
  });

  // Save in the database
  Horario.create(horario, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Error al crear un horario"
      });
	  else {
		  req.flash('succes','El horario se ha guardado');
		  res.redirect('/horario')
	  }
  });
};

// GET ALL ELEMENTS.
exports.findAll = (req, res) => {
  Horario.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Error al regresar horario de la BD"
      }); 
    else {
		// var vsession = req.session;
		res.render('horario/list',{ data });
	}
  });
};

// FIND BY ID
exports.findOne = (req, res) => {
  Horario.findById(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `No se encontro horario con id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "Error consiguiendo horario con id " + req.params.id
        });
      }
    }
	  // else res.send(data);
	 else {
		var vsession = req.session;
		res.render('horario/byId',{ data });
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
  Horario.updateById(
    req.params.id,
    new Horario(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `No se encontro horario con id ${req.params.id}.`
          });
        } else {
          res.status(500).send({
            message: "Error actializando horario con id " + req.params.id
          });
        }
      } 
		else {
			req.flash('succes','El horario se ha actualizado');
			res.redirect('/horario/'+req.params.id);
		}
    }
  );
};

// DELETE BYID
exports.delete = (req, res) => {
  Horario.remove(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `No se encontro horario con id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "No se pudo borrar horario con id " + req.params.id
        });
      }
    } 
	  else {
		  req.flash('succes','El horario se ha borrado');
		  res.redirect('/horario')
	  }
  });
};

// DELETE ALL
exports.deleteAll = (req, res) => {
  Horario.removeAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Error Borrando todos los Horarios"
      });
	  else {
		  req.flash('succes','Se ha borrado todo con exito');
		  res.redirect('/horario')
	  }
  });
};