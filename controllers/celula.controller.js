const Celula = require("../models/celula.model.js");

// CREATE ELEMENT
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Contenido no puede estar vacio!"
    });
  }

  // Create JSON
  const celula = new Celula({
	id_celula: req.body.id_celula,
    nombre_celula: req.body.nombre_celula,
    id_lider: req.body.id_lider,  
  });

  // Save in the database
  Celula.create(celula, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Error al crear una celula"
      });
	  else {
		  req.flash('succes','La celula se ha guardado');
		  res.redirect('/celula')
	  }
  });
};

// GET ALL ELEMENTS.
exports.findAll = (req, res) => {
  Celula.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Error al regresar celula de la BD"
      }); 
    else {
		// var vsession = req.session;
		res.render('celula/list',{ data });
	}
  });
};

// FIND BY ID
exports.findOne = (req, res) => {
  Celula.findById(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `No se encontro celula con id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "Error consiguiendo celula con id " + req.params.id
        });
      }
    } 
	  // else res.send(data);
	 else {
		var vsession = req.session;
		res.render('celula/byId',{ data });
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
  Celula.updateById(
    req.params.id,
    new Celula(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `No se encontro celula con id ${req.params.id}.`
          });
        } else {
          res.status(500).send({
            message: "Error actializando celula con id " + req.params.id
          });
        }
      } 
		else {
			req.flash('succes','La celula se ha actualizado');
			res.redirect('/celula/'+req.params.id);
		}
    }
  );
};

// DELETE BYID
exports.delete = (req, res) => {
  Celula.remove(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `No se encontro celula con id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "No se pudo borrar celula con id " + req.params.id
        });
      }
    } 
	  else {
		  req.flash('succes','El celula se ha borrado');
		  res.redirect('/celula')
	  }
  });
};

// DELETE ALL
exports.deleteAll = (req, res) => {
  Celula.removeAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Error Borrando todas las Celulas"
      });
	  else {
		  req.flash('succes','Se ha borrado todo con exito');
		  res.redirect('/celula')
	  }
  });
};

// GET ALL - FOR VOLUNTARIO FORM
exports.voluntariosAll = (req, res) => {
  Celula.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Error al regresar celula de la BD"
      }); 
    else {
		// var vsession = req.session;
		res.render('voluntario/form',{ data });
	}
  });
};