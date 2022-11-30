const Aporte = require("../models/aporte.model.js");

// CREATE ELEMENT
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Contenido no puede estar vacio!"
    });
  }

  // Create JSON
  const aporte = new Aporte({
    id_aporte: req.body.id_aporte,
	id_doliente: req.body.id_doliente,
	cantidad_que_aporto: req.body.cantidad_que_aporto,
	fecha_de_deposito: req.body.fecha_de_deposito,
  });

  // Save in the database
  Aporte.create(aporte, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Error al crear un aporte"
      });
	  else {
		  req.flash('succes','El aporte se ha guardado');
		  res.redirect('/aporte')
	  }
  });
};

// GET ALL ELEMENTS.
exports.findAll = (req, res) => {
  Aporte.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Error al regresar aporte de la BD"
      }); 
    else {
		var vsession = req.session;
		res.render('aporte/list',{ data, vsession });
	}
  });
};

// FIND BY ID
exports.findOne = (req, res) => {
  Aporte.findById(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `No se encontro aporte con id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "Error consiguiendo aporte con id " + req.params.id
        });
      }
    } 
	  // else res.send(data);
	 else {
		var vsession = req.session;
		res.render('aporte/byId',{ data, vsession });
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
  Aporte.updateById(
    req.params.id,
    new Aporte(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `No se encontro aporte con id ${req.params.id}.`
          });
        } else {
          res.status(500).send({
            message: "Error actualizando aporte con id " + req.params.id
          });
        }
      } 
		else {
			req.flash('succes','El aporte se ha actualizado');
			res.redirect('/aporte/'+req.params.id);
		}
    }
  );
};

// DELETE BYID
exports.delete = (req, res) => {
  Aporte.remove(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `No se encontro aporte con id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "No se pudo borrar aporte con id " + req.params.id
        });
      }
    } 
	  else {
		  req.flash('succes','El aporte se ha borrado');
		  res.redirect('/aporte')
	  }
  });
};

// DELETE ALL
exports.deleteAll = (req, res) => {
  Aporte.removeAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Error Borrando todas los Aportes"
      });
	  else {
		  req.flash('succes','Se ha borrado todo con exito');
		  res.redirect('/aporte')
	  }
  });
};
