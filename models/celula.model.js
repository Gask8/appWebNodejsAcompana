const sql = require("./db.js");

// constructor
const Celula = function(celula) {
  this.id_celula = celula.id_celula
  this.nombre_celula = celula.nombre_celula;
  this.nombre_lider = celula.nombre_lider;
};

Celula.create = (newCelula, result) => {
  sql.query("INSERT INTO celula SET ?", newCelula, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    console.log("created celula: ", { id: res.id_celula, ...newCelula });
    result(null, { id: res.id_celula, ...newCelula });
  });
};

Celula.findById = (id_celula, result) => {
  sql.query("SELECT * FROM celula WHERE id_celula = ?", id_celula, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found celula: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found Example with the id
    result({ kind: "not_found" }, null);
  });
};

Celula.getAll = result => {
  sql.query("SELECT * FROM celula", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }
	  console.log("Se encontraron todas las celulas: ");
    // console.log("examples: ", res);
    result(null, res);
  });
};

Celula.updateById = (id_celula, celula, result) => {
  sql.query(
    "UPDATE celula SET nombre_celula = ?, nombre_lider = ?, WHERE id_celula = ?",
    [celula.nombre_celula, celula.nombre_lider, id_celula],
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

      console.log("updated celula: ", { id: id_celula, ...celula });
      result(null, { id: id_celula, ...celula });
    }
  );
};

Celula.remove = (id_celula, result) => {
  sql.query("DELETE FROM celula WHERE id_celula = ?", id_celula, (err, res) => {
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

    console.log("deleted celula with id: ", id_celula);
    result(null, res);
  });
};

Celula.removeAll = result => {
  sql.query("DELETE FROM celula", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} celulas`);
    result(null, res);
  });
};

module.exports = Celula;