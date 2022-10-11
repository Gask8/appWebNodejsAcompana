const sql = require("./db.js");

// constructor
const Canalizado = function(canalizado) {
  this.id_doliente= canalizado.id_doliente
  this.canalizado_a = canalizado.canalizado_a;
  this.canalizado_comentario = canalizado.canalizado_comentario;
};

Canalizado.create = (newCanalizado, result) => {
  sql.query("INSERT INTO canalizado SET ?", newCanalizado, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    console.log("created canalizado: ", { id: res.id_doliente, ...newCanalizado });
    result(null, { id: res.id_doliente, ...newCanalizado });
  });
};

Canalizado.findById = (id_doliente, result) => {
  sql.query("SELECT * FROM canalizado WHERE id_doliente = ?", id_doliente, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found canalizado: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found Example with the id
    result({ kind: "not_found" }, null);
  });
};

Canalizado.getAll = result => {
  sql.query("SELECT * FROM canalizado", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }
	  console.log("found all canalizados: ");
    // console.log("examples: ", res);
    result(null, res);
  });
};

Canalizado.updateById = (id_doliente, canalizado, result) => {
  sql.query(
    "UPDATE canalizado SET canalizado_a = ?, canalizado_comentario = ?, WHERE id_doliente = ?",
    [canalizado.canalizado_a, canalizado.canalizado_comentario, id_doliente],
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

      console.log("updated canalizado: ", { id: id_doliente, ...canalizado });
      result(null, { id: id_doliente, ...canalizado });
    }
  );
};

Canalizado.remove = (id_doliente, result) => {
  sql.query("DELETE FROM canalizado WHERE id_doliente = ?", id_doliente, (err, res) => {
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

    console.log("deleted canalizado with id: ", id_doliente);
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