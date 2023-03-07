const sql = require("../config/db.js");

// constructor
const Canalizado = function(canalizado) {
  this.id_doliente = canalizado.id_doliente;
  this.canalizado_a = canalizado.canalizado_a;
  this.canalizado_comentario = canalizado.canalizado_comentario;
};

Canalizado.create = (newCanalizado, result) => {
  sql.query("INSERT INTO canalizado SET ?", newCanalizado, (err, res) => {
    if (err) {
      console.log("Error: ", err);
      result(err, null);
      return;
    }
    console.log("canalizado creado: ", { id: res.id_doliente, ...newCanalizado });
    result(null, { id: res.id_doliente, ...newCanalizado });
  });
};

Canalizado.findById = (id, result) => {
  sql.query(`SELECT * FROM canalizado WHERE id_doliente = ${id}`, (err, res) => {
    if (err) {
      console.log("Error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("canalizado encontrado: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found Example with the id
    result({ kind: "not_found" }, null);
  });
};
	
Canalizado.getAll = result => {
  sql.query("SELECT c.id_doliente, d.primer_nombre, d.apellido_paterno, c.canalizado_a, c.canalizado_comentario FROM canalizado c, doliente d WHERE c.id_doliente = d.id_doliente", (err, res) => {
    if (err) {
      console.log("Error: ", err);
      result(null, err);
      return;
    }
	  console.log("canalizados encontrados",res);
	  result(null, res);
  });
};

Canalizado.updateById = (id_doliente, canalizado, result) => {
  sql.query(
    "UPDATE canalizado SET canalizado_a = ?, canalizado_comentario = ? WHERE id_doliente = ?",
    [canalizado.canalizado_a, canalizado.canalizado_comentario, id_doliente],
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

      console.log("canalizado: actualizado", { id: id_doliente, ...canalizado });
      result(null, { id: id_doliente, ...canalizado });
    }
  );
};

Canalizado.remove = (id_doliente, result) => {
  sql.query("DELETE FROM canalizado WHERE id_doliente = ?", id_doliente, (err, res) => {
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

    console.log("canalizado borrada con id: ", id_doliente);
    result(null, res);
  });
};

Canalizado.removeAll = result => {
  sql.query("DELETE FROM canalizado", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} canalizados`);
    result(null, res);
  });
};

module.exports = Canalizado;