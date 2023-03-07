const sql = require("../config/db.js");

// constructor
const SerQ = function(serQ) {
  this.id_serQ = serQ.id_serQ;
  this.f_fecha_muerte = serQ.f_fecha_muerte;
  this.f_nombre = serQ.f_nombre;
  this.f_tipo_relacion = serQ.apellido_paterno;
  this.f_motivo_muerte = serQ.edad;
  this.f_edad_muerte = serQ.ciudad_pais;
};

SerQ.create = (newSerQ, result) => {
  sql.query("INSERT INTO serQ SET ?", newSerQ, (err, res) => {
    if (err) {
      console.log("Error: ", err);
      result(err, null);
      return;
    }
    console.log("serQ creado: ", { id: res.id_serQ, ...newSerQ });
    result(null, { id: res.id_serQ, ...newSerQ });
  });
};

SerQ.findById = (id, result) => {
  sql.query(`SELECT * FROM serQ WHERE id_serQ = ${id}`, (err, res) => {
    if (err) {
      console.log("Error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("serQ encontrado: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found Example with the id
    result({ kind: "not_found" }, null);
  });
};

SerQ.remove = (id_serQ, result) => {
  sql.query("DELETE FROM serQ WHERE id_serQ = ?", id_serQ, (err, res) => {
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

    console.log("serQ borrado con id: ", id_serQ);
    result(null, res);
  });
};

module.exports = SerQ;
