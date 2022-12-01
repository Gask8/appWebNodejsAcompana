const { Client,LocalAuth  } = require('whatsapp-web.js');
const Escucha = require("../models/escucha.model.js");
const Voluntario = require("../models/voluntario.model.js");
const Doliente = require("../models/doliente.model.js");
const client = require("../config/client.js");

// CREAR LAS CITAS
exports.create = async(req, res) => {
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
  let volunum,dolunum,nomdol;
  let citas = [];
  const date = new Date(escucha.fecha);
  escucha.fecha=date.toISOString().split('.')[0];
  citas.push(escucha.fecha.split('T')[0]);
  for (let i = 0; i < 3; i++) {
    await Escucha.create(escucha, (err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Error al crear una escucha"
        });
    });
    date.setDate(date.getDate() + 7);
    escucha.fecha=date.toISOString().split('.')[0];
    citas.push(escucha.fecha.split('T')[0]);
  }

  await Voluntario.findById(req.body.id_voluntario, async(err, data) => {
    try{
      volunum = "52"+data.numero_celular+"@c.us";
      await Doliente.findById(req.body.id_doliente, async(err, data) => {
        try{
          dolunum = "52"+data.numero_celular+"@c.us";
          nomdol=data.primer_nombre+" "+data.apellido_paterno;
          //Mensaje a doliente
          client.sendMessage(dolunum, "Hola, tus citas son los dias: "+citas+". Enviaremos mas informacion del dia de tu cita");
          //Mensaje a voluntario
          client.sendMessage(volunum, "Hola, tu doliente es "+nomdol+" y tu zoom sera: Join Zoom Meeting https://us05web.zoom.us/j/9631463760?pwd=aVgvZERWQXNnL256UE9BemVYbHpIdz09 Meeting ID: 963 146 3760 Passcode: Na3UWS");
        }
        catch{
          console.log("Error encontrando doliente")
        }
      });
    }
    catch{
      console.log("Error encontrando voluntario")
    }
  });
  
  req.flash('succes','Las escuchas se han generado y se han mandado los mansajes');
  res.redirect('/escucha')
};


// Mandar Recordatorios
exports.reminder = async(req, res) => {

  await Escucha.getAllToday(async(err, data) => {
    try{
      for (let element of data) {
        let volnum = "52"+element.numvol+"@c.us";
        let dolunum = "52"+element.numdol+"@c.us";
        let nomdol=element.primer_nombre+" "+element.apellido_paterno;
        let hoy = element.fecha.toISOString().split('T')[0];
        //Mensaje a doliente
        client.sendMessage(dolunum, "Hola, tus cita es hoy a las: "+hoy+" y tu zoom sera: Join Zoom Meeting https://us05web.zoom.us/j/9631463760?pwd=aVgvZERWQXNnL256UE9BemVYbHpIdz09 Meeting ID: 963 146 3760 Passcode: Na3UWS");
        //Mensaje a voluntario
        client.sendMessage(volunum, "Hola, tienes una cita hoy a las "+hoy+" con "+nomdol+" y tu zoom sera: Join Zoom Meeting https://us05web.zoom.us/j/9631463760?pwd=aVgvZERWQXNnL256UE9BemVYbHpIdz09 Meeting ID: 963 146 3760 Passcode: Na3UWS");
      }
    }
    catch{
      console.log("Error enviar recordatorios "+err);
    }
  });
  
  req.flash('succes','Los recordatiorios se han mandado');
  res.redirect('/escucha')
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
		var vsession = req.session;
		res.render('escucha/listAll',{ data, vsession });
	}
  });
};

// GET ALL ELEMENTS.
exports.findAllToday = (req, res) => {
  Escucha.getAllToday((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Error al regresar escucha de la BD"
      }); 
    else {
		var vsession = req.session;
		res.render('escucha/list',{ data, vsession });
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
		res.render('escucha/byId',{ data, vsession });
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