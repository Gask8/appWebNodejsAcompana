const { Client,LocalAuth  } = require('whatsapp-web.js');
const Escucha = require("../models/escucha.model.js");
const client = require("../config/client.js");

// CREATE ELEMENT
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Contenido no puede estar vacio!"
    });
  }

  // Create JSON
  const escucha = new Escucha({	  
	  id_escucha: req.body.id_escucha,
  	id_doliente: req.body.id_doliente,
  	id_voluntario: req.body.id_voluntario,
	  numero_escucha: req.body.numero_escucha,
  	fecha: req.body.fecha,
  	hora_termino: req.body.hora_termino,
  	se_cumplio: req.body.se_cumplio,
  	comentario: req.body.comentario,
  });

  // Save in the database
  Escucha.create(escucha, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Error al crear una escucha"
      });
	  else {
      client.sendMessage("5215540270556@c.us", "hola");
      client.sendMessage("5215540270556@c.us", "hola");
		  req.flash('succes','La escucha se ha guardado');
		  res.redirect('/escucha')
	  }
  });
};

// GET ALL ELEMENTS.
exports.findAll = (req, res) => {
  Escucha.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Error al regresar escucha de la BD"
      }); 
    else {
		// var vsession = req.session;
		res.render('escucha/list',{ data });
	}
  });
};

// FIND BY ID
exports.findOne = (req, res) => {
  Escucha.findById(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `No se encontro escucha con id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "Error consiguiendo escucha con id " + req.params.id
        });
      }
    }
	  // else res.send(data);
	 else {
		var vsession = req.session;
		res.render('escucha/byId',{ data });
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
  Escucha.updateById(
    req.params.id,
    new Escucha(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `No se encontro escucha con id ${req.params.id}.`
          });
        } else {
          res.status(500).send({
            message: "Error actualizando escucha con id " + req.params.id
          });
        }
      } 
		else {
			req.flash('succes','La escucha se ha actualizado');
			res.redirect('/escucha/'+req.params.id);
		}
    }
  );
};

// DELETE BYID
exports.delete = (req, res) => {
  Escucha.remove(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `No se encontro escucha con id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "No se pudo borrar escucha con id " + req.params.id
        });
      }
    } 
	  else {
		  req.flash('succes','La escucha se ha borrado');
		  res.redirect('/escucha')
	  }
  });
};

// DELETE ALL
exports.deleteAll = (req, res) => {
  Escucha.removeAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Error Borrando todas las Escuchas"
      });
	  else {
		  req.flash('succes','Se ha borrado todo con exito');
		  res.redirect('/escucha')
	  }
  });
};