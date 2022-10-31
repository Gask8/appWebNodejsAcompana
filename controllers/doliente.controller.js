const Doliente = require("../models/doliente.model.js");
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
  const doliente = new Doliente({
	id_doliente: req.body.id_doliente,
  	marca_temporal: req.body.marca_temporal,
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

  // Save in the database
  Doliente.create(doliente, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Error al crear un doliente"
      });
	  else {
		  req.flash('succes','El doliente se ha guardado');
		  res.redirect('/doliente')
	  }
  });
};

// GET ALL ELEMENTS.
exports.findAll = (req, res) => {
  Doliente.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Error al regresar doliente de la BD"
      }); 
    else {
		// var vsession = req.session;
		res.render('doliente/list',{ data });
	}
  });
};

// FIND BY ID
exports.findOne = (req, res) => {
  Doliente.findById(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `No se encontro doliente con id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "Error consiguiendo doliente con id " + req.params.id
        });
      }
    }
	  // else res.send(data);
	 else {
		var vsession = req.session;
		res.render('doliente/byId',{ data });
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
  Doliente.updateById(
    req.params.id,
    new Doliente(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `No se encontro doliente con id ${req.params.id}.`
          });
        } else {
          res.status(500).send({
            message: "Error actializando doliente con id " + req.params.id
          });
        }
      } 
		else {
			req.flash('succes','El doliente se ha actualizado');
			res.redirect('/doliente/'+req.params.id);
		}
    }
  );
};

// DELETE BYID
exports.delete = (req, res) => {
  Doliente.remove(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `No se encontro doliente con id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "No se pudo borrar doliente con id " + req.params.id
        });
      }
    } 
	  else {
		  req.flash('succes','El doliente se ha borrado');
		  res.redirect('/doliente')
	  }
  });
};

// DELETE ALL
exports.deleteAll = (req, res) => {
  Doliente.removeAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Error Borrando todos los Dolientes"
      });
	  else {
		  req.flash('succes','Se ha borrado todo con exito');
		  res.redirect('/doliente')
	  }
  });
};

// GET ALL VOLUNTARIO-DOLIENTE - FOR ESCUCHA FORM
exports.dolientesVoluntariosAll = (req, res) => {
  Doliente.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Error al regresar doliente de la BD"
      }); 
    else {
		
		Voluntario.getAll((err2, data2) => {
			if (err2)
			  res.status(500).send({
				message:
				  err2.message || "Error al regresar voluntario de la BD"
			  }); 
			else {
				// var vsession = req.session;
				res.render('escucha/form',{ data, data2 });
			}
	  	});
	}
  });
};