const sql = require("../config/db.js");

// constructor
const Horario = function(horario) {
  this.id_horario = horario.id_horario;
  this.id_voluntario = horario.id_voluntario;
  this.hora_comienzo = horario.hora_comienzo;
  this.hora_termino = horario.hora_termino;
  this.dia_semana = horario.dia_semana;
};

Horario.create = (newHorario, result) => {
  sql.query("INSERT INTO horario SET ?", newHorario, (err, res) => {
    if (err) {
      console.log("Error: ", err);
      result(err, null);
      return;
    }
    console.log("horario creado: ", { id: res.id_horario, ...newHorario });
    result(null, { id: res.id_horario, ...newHorario });
  });
};

Horario.findById = (id, result) => {
  sql.query(`SELECT * FROM horario WHERE id_voluntario = ${id}`, (err, res) => {
    if (err) {
      console.log("Error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("horario encontrado: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found Example with the id
    result({ kind: "not_found" }, null);
  });
};

Horario.getAll = result => {
  sql.query("SELECT * FROM horario", (err, res) => {
    if (err) {
      console.log("Error: ", err);
      result(null, err);
      return;
    }
	  console.log("horarios encontrados",res);
	  result(null, res);
  });
};

Horario.getAllForAllVol = result => {
  sql.query("SELECT v.id_voluntario, hora_comienzo, hora_termino, dia_semana, nombre, apellido, color FROM horario h, voluntario v, celula c WHERE h.id_voluntario=v.id_voluntario AND v.id_celula=c.id_celula;", (err, res) => {
    if (err) {
      console.log("Error: ", err);
      result(null, err);
      return;
    }
	  console.log("horarios encontrados",res);
	  result(null, res);
  });
};

Horario.getAllForVol = (id_voluntario, result) => {
  sql.query("SELECT * FROM horario WHERE id_voluntario = ?", [id_voluntario],(err, res) => {
    if (err) {
      console.log("Error: ", err);
      result(null, err);
      return;
    }
	  console.log("horarios encontrados",res);
	  result(null, res);
  });
};

Horario.updateById = (id_horario, horario, result) => {
  sql.query(
    "UPDATE horario SET id_voluntario = ?, hora_comienzo = ?, hora_termino = ?, dia_semana = ? WHERE id_horario = ?",
    [horario.id_voluntario, horario.hora_comienzo, horario.hora_termino, horario.dia_semana, id_horario],
    (err, res) => {
      if (err) {
        console.log("Error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found Example with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("horario: actualizado", { id: id_horario, ...horario });
      result(null, { id: id_horario, ...horario });
    }
  );
};

Horario.remove = (id_horario, result) => {
  sql.query("DELETE FROM horario WHERE id_horario = ?", id_horario, (err, res) => {
    if (err) {
      console.log("Error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found Example with the id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("horario borrado con id: ", id_horario);
    result(null, res);
  });
};

Horario.removeAll = result => {
  sql.query("DELETE FROM horario", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} horarios`);
    result(null, res);
  });
};

module.exports = Horario;