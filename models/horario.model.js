const sql = require("./db.js");

// constructor
const Horario = function(horario) {
  this.id_horario = horario.id_horario
  this.id_voluntario = horario.id_voluntario;
  this.hora_comienzo = horario.hora_comienzo;
  this.hora_termino = horario.hora_termino;
  this.dia_semana = horario.dia_semana;
};

Horario.create = (newHorario, result) => {
  sql.query("INSERT INTO horario SET ?", newHorario, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    console.log("created horario: ", { id: res.id_horario, ...newHorario });
    result(null, { id: res.id_horario, ...newHorario });
  });
};

Horario.findById = (id_horario, result) => {
  sql.query("SELECT * FROM horario WHERE id_horario = ?", id_horario, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found horario: ", res[0]);
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
      console.log("error: ", err);
      result(null, err);
      return;
    }
	  console.log("found all horarios: ");
    // console.log("examples: ", res);
    result(null, res);
  });
};

Horario.updateById = (id_horario, horario, result) => {
  sql.query(
    "UPDATE horario SET id_voluntario = ?, hora_comienzo = ?, hora_termino = ?, dia_semana = ?, WHERE id_horario = ?",
    [horario.id_voluntario, horario.hora_comienzo, horario.hora_termino, horario.dia_semana, id_horario],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found Example with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated horario: ", { id: id_horario, ...horario });
      result(null, { id: id_horario, ...horario });
    }
  );
};

Horario.remove = (id_horario, result) => {
  sql.query("DELETE FROM horario WHERE id_horario = ?", id_horario, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found Example with the id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted horario with id: ", id_horario);
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