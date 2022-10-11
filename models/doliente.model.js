const sql = require("./db.js");

// constructor
const Doliente = function(doliente) {
  this.id_doliente = doliente.id_doliente
  this.marca_temporal = doliente.marca_temporal;
  this.clave_de_registro = doliente.clave_de_registro;
  this.primer_nombre = doliente.primer_nombre;
  this.apellido_paterno = doliente.apellido_paterno;
  this.edad = doliente.edad;
  this.ciudad_pais = doliente.ciudad_pais;
  this.numero_celular = doliente.numero_celular;
  this.correo = doliente.correo;
  this.liga_url = doliente.liga_url;
  this.liga_id = doliente.liga_id;
  this.liga_password = doliente.liga_password;
  this.preferencia_de_horario = doliente.preferencia_de_horario;
  this.medio_de_enterarse = doliente.medio_de_enterarse;
  this.quieres_recibir_info = doliente.quieres_recibir_info;
};

Doliente.create = (newDoliente, result) => {
  sql.query("INSERT INTO doliente SET ?", newDoliente, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    console.log("created doliente: ", { id: res.id_doliente, ...newDoliente });
    result(null, { id: res.id_doliente, ...newDoliente });
  });
};

Doliente.findById = (id_doliente, result) => {
  sql.query("SELECT * FROM doliente WHERE id_doliente = ?", id_doliente, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found doliente: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found Example with the id
    result({ kind: "not_found" }, null);
  });
};

Doliente.getAll = result => {
  sql.query("SELECT * FROM doliente", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }
	  console.log("found all dolientes: ");
    // console.log("examples: ", res);
    result(null, res);
  });
};

Doliente.updateById = (id_doliente, doliente, result) => {
  sql.query(
    "UPDATE doliente SET marca_temporal = ?, clave_de_registro = ?, primer_nombre = ?, apellido_paterno = ?, edad = ?, ciudad_pais = ?, numero_celular = ?, correo = ?, liga_url = ?, liga_id = ?, liga_password = ?, preferencia_de_horario = ?, medio_de_enterarse = ?, quieres_recibir_info = ?, WHERE id_doliente = ?",
    [doliente.marca_temporal, doliente.clave_de_registro, doliente.primer_nombre, doliente.apellido_paterno, doliente.edad,
	 doliente.ciudad_pais, doliente.numero_celular, doliente.correo, doliente.liga_url, doliente.liga_id, doliente.liga_password,
	 doliente.preferencia_de_horario, doliente.medio_de_enterarse, doliente.quieres_recibir_info, id_doliente],
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

      console.log("updated doliente: ", { id: id_doliente, ...doliente });
      result(null, { id: id_doliente, ...doliente });
    }
  );
};

Doliente.remove = (id_doliente, result) => {
  sql.query("DELETE FROM doliente WHERE id_doliente = ?", id_doliente, (err, res) => {
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

    console.log("deleted doliente with id: ", id_doliente);
    result(null, res);
  });
};

Doliente.removeAll = result => {
  sql.query("DELETE FROM doliente", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} dolientes`);
    result(null, res);
  });
};

module.exports = Doliente;