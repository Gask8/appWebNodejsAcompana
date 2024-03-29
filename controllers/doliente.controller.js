const Doliente = require("../models/doliente.model.js");
const Voluntario = require("../models/voluntario.model.js");
const Horario = require("../models/horario.model.js");
const SerQ = require("../models/ser_querido.model.js");

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
	  f_fecha_muerte: req.body.f_fecha_muerte,
	  f_nombre: req.body.f_nombre,
	  f_tipo_relacion: req.body.f_tipo_relacion,
	  f_motivo_muerte: req.body.f_motivo_muerte,
	  f_edad_muerte: req.body.f_edad_muerte
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
		  res.redirect('/gracias')
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
		var vsession = req.session;
		res.render('doliente/list',{ data, vsession });
	}
  });
};

exports.findAllNew = (req, res) => {
  Doliente.getAllNew((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Error al regresar doliente de la BD"
      }); 
    else {
		var vsession = req.session;
		res.render('doliente/listNew',{ data, vsession });
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
		res.render('doliente/byId',{ data, vsession });
	}
  });
};

// FIND BY ID
exports.findOneAdd = (req, res) => {
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
		res.render('doliente/byIdAdd',{ data, vsession });
	}
  });
};

// UPDATE BY ID
exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Contenido no puede estar vacio!"
    });
  }
  Doliente.updateByIdSimple(
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

// COMPLEMENT BY ID
exports.updateAdd = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Contenido no puede estar vacio!"
    });
  }
  Doliente.updateByIdAdding(
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
			req.flash('succes','El Doliente ya tiene su liga');
			res.redirect('/escucha/nuevo?id_doliente='+req.params.id+'&name='+req.body.primer_nombre+'&lastname='+req.body.apellido_paterno);
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

        Horario.getAllForAllVol((err3, data3) => {
          if (err3)
            res.status(500).send({
            message:
            err2.message || "Error al regresar horarios de la BD"
            }); 
          else {

            var urlquery = {
              id: req.query.id_doliente || null,
              name: (req.query.name+" "+req.query.lastname) || null,
            }
            var vsession = req.session;
            res.render('escucha/form',{ data, data2, data3, urlquery, vsession });

          }

        })
			}
	  	});
	}
  });
};

// GET ALL - FOR APORTE FORM
exports.aportesAll = (req, res) => {
  Doliente.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Error al regresar doliente de la BD"
      }); 
    else {
		var vsession = req.session;
		res.render('aporte/form',{ data, vsession });
	}
  });
};


// GET ALL - FOR CANALIZADO FORM
exports.canalizadosAll = (req, res) => {
  Doliente.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Error al regresar doliente de la BD"
      }); 
    else {
		var vsession = req.session;
		res.render('canalizado/form',{ data, vsession });
	}
  });
};