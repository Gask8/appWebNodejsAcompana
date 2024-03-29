const sql = require("../config/db.js");

// constructor
const Aporte = function(aporte) {
  this.id_aporte = aporte.id_aporte;
  this.id_doliente = aporte.id_doliente;
  this.cantidad_que_aporto = aporte.cantidad_que_aporto;
  this.fecha_de_deposito = aporte.fecha_de_deposito;
};

Aporte.create = (newAporte, result) => {
  sql.query("INSERT INTO aporte SET ?", newAporte, (err, res) => {
    if (err) {
      console.log("Error: ", err);
      result(err, null);
      return;
    }
    console.log("aporte creado: ", { id: res.id_aporte, ...newAporte });
    result(null, { id: res.id_aporte, ...newAporte });
  });
};

Aporte.findById = (id, result) => {
  sql.query(`SELECT * FROM aporte WHERE id_aporte = ${id}`, (err, res) => {
    if (err) {
      console.log("Error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("aporte encontrado: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found Example with the id
    result({ kind: "not_found" }, null);
  });
};
	
Aporte.getAll = result => {
  sql.query("SELECT * FROM aporte", (err, res) => {
    if (err) {
      console.log("Error: ", err);
      result(null, err);
      return;
    }
	  console.log("aportes encontrados",res);
	  result(null, res);
  });
};

Aporte.updateById = (id_aporte, aporte, result) => {
  sql.query(
    "UPDATE aporte SET id_doliente = ?, cantidad_que_aporto = ?, fecha_de_deposito = ? WHERE id_aporte = ?",
    [aporte.id_doliente, aporte.cantidad_que_aporto, fecha_de_deposito, id_aporte],
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

      console.log("aporte: actualizado", { id: id_aporte, ...aporte });
      result(null, { id: id_aporte, ...aporte });
    }
  );
};

Aporte.remove = (id_aporte, result) => {
  sql.query("DELETE FROM aporte WHERE id_aporte = ?", id_aporte, (err, res) => {
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

    console.log("aporte borrada con id: ", id_aporte);
    result(null, res);
  });
};

Aporte.removeAll = result => {
  sql.query("DELETE FROM aporte", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} aportes`);
    result(null, res);
  });
};

module.exports = Aporte;