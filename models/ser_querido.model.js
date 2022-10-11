const sql = require("./db.js");

// constructor
const Ser_querido = function(ser_querido) {
  this.id_doliente= ser_querido.id_doliente
  this.fecha_muerte = ser_querido.fecha_muerte;
  this.nombre = ser_querido.nombre;
  this.tipo_relacion = ser_querido.tipo_relacion;
  this.motivo_muerte = ser_querido.motivo_muerte;
  this.edad_muerte = ser_querido.edad_muerte;
};

Ser_querido.create = (newSer_querido, result) => {
  sql.query("INSERT INTO ser_querido SET ?", newSer_querido, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    console.log("created ser_querido: ", { id: res.id_doliente, ...newSer_querido });
    result(null, { id: res.id_doliente, ...newSer_querido });
  });
};

Ser_querido.findById = (id_doliente, result) => {
  sql.query("SELECT * FROM ser_querido WHERE id_doliente = ?", id_doliente, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found ser_querido: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found Example with the id
    result({ kind: "not_found" }, null);
  });
};

Ser_querido.getAll = result => {
  sql.query("SELECT * FROM ser_querido", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }
	  console.log("found all ser_queridos: ");
    // console.log("examples: ", res);
    result(null, res);
  });
};

Ser_querido.updateById = (id_doliente, ser_querido, result) => {
  sql.query(
    "UPDATE ser_querido SET fecha_muerte = ?, nombre = ?, tipo_relacion = ?, motivo_muerte = ?, edad_muerte = ?, WHERE id_doliente = ?",
    [ser_querido.fecha_muerte, ser_querido.nombre, ser_querido.tipo_relacion, ser_querido.motivo_muerte, 
	 ser_querido.edad_muerte, id_doliente],
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

      console.log("updated ser_querido: ", { id: id_doliente, ...ser_querido });
      result(null, { id: id_doliente, ...ser_querido });
    }
  );
};

Ser_querido.remove = (id_doliente, result) => {
  sql.query("DELETE FROM ser_querido WHERE id_doliente = ?", id_doliente, (err, res) => {
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

    console.log("deleted ser_querido with id: ", id_doliente);
    result(null, res);
  });
};

Ser_querido.removeAll = result => {
  sql.query("DELETE FROM ser_querido", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} ser_queridos`);
    result(null, res);
  });
};

module.exports = Ser_querido;