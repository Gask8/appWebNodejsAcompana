const Canalizado = require("../models/canalizado.model.js");

// CREATE ELEMENT
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Contenido no puede estar vacio!"
    });
  }

  // Create JSON
  const canalizado = new Canalizado({
	id_doliente: req.body.id_doliente,
	canalizado_a: req.body.canalizado_a,
	canalizado_comentario: req.body.canalizado_comentario,
  });

  // Save in the database
  Canalizado.create(canalizado, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Error al crear un canalizado"
      });
	  else {
		  req.flash('succes','El canalizado se ha guardado');
		  res.redirect('/canalizado')
	  }
  });
};

// GET ALL ELEMENTS.
exports.findAll = (req, res) => {
  Canalizado.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Error al regresar canalizado de la BD"
      }); 
    else {
		var vsession = req.session;
		res.render('canalizado/list',{ data, vsession });
	}
  });
};

// FIND BY ID
exports.findOne = (req, res) => {
  Canalizado.findById(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `No se encontro canalizado con id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "Error consiguiendo canalizado con id " + req.params.id
        });
      }
    } 
	  // else res.send(data);
	 else {
		var vsession = req.session;
		res.render('canalizado/byId',{ data, vsession });
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
  Canalizado.updateById(
    req.params.id,
    new Canalizado(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `No se encontro canalizado con id ${req.params.id}.`
          });
        } else {
          res.status(500).send({
            message: "Error actualizando canalizado con id " + req.params.id
          });
        }
      } 
		else {
			req.flash('succes','El canalizado se ha actualizado');
			res.redirect('/canalizado/'+req.params.id);
		}
    }
  );
};

// DELETE BYID
exports.delete = (req, res) => {
  Canalizado.remove(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `No se encontro canalizado con id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "No se pudo borrar canalizado con id " + req.params.id
        });
      }
    } 
	  else {
		  req.flash('succes','El canalizado se ha borrado');
		  res.redirect('/canalizado')
	  }
  });
};

// DELETE ALL
exports.deleteAll = (req, res) => {
  Canalizado.removeAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Error Borrando todas los Aportes"
      });
	  else {
		  req.flash('succes','Se ha borrado todo con exito');
		  res.redirect('/canalizado')
	  }
  });
};
