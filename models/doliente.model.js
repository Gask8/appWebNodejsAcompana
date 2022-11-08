const sql = require("../config/db.js");

// constructor
const Doliente = function(doliente) {
  this.id_doliente = doliente.id_doliente;
  this.marca_temporal = doliente.marca_temporal;
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
  this.f_fecha_muerte = doliente.f_fecha_muerte;
  this.f_nombre = doliente.f_nombre;
  this.f_tipo_relacion = doliente.f_tipo_relacion;
  this.f_motivo_muerte = doliente.f_motivo_muerte;
  this.f_edad_muerte = doliente.f_edad_muerte;
};

Doliente.create = (newDoliente, result) => {
  sql.query("INSERT INTO doliente SET ?", newDoliente, (err, res) => {
    if (err) {
      console.log("Error: ", err);
      result(err, null);
      return;
    }
    console.log("doliente creado: ", { id: res.id_doliente, ...newDoliente });
    result(null, { id: res.id_doliente, ...newDoliente });
  });
};

Doliente.findById = (id, result) => {
  sql.query(`SELECT * FROM doliente WHERE id_doliente = ${id}`, (err, res) => {
    if (err) {
      console.log("Error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("doliente encontrado: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found Example with the id
    result({ kind: "not_found" }, null);
  });
};

Doliente.getAllNew = result => {
  sql.query("SELECT * FROM doliente WHERE id_doliente NOT in(SELECT d.id_doliente FROM doliente d, escucha e WHERE d.id_doliente = e.id_doliente);", (err, res) => {
    if (err) {
      console.log("Error: ", err);
      result(null, err);
      return;
    }
	  console.log("dolientes encontrados",res);
	  result(null, res);
  });
};


Doliente.getAll = result => {
  sql.query("SELECT * FROM doliente", (err, res) => {
    if (err) {
      console.log("Error: ", err);
      result(null, err);
      return;
    }
	  console.log("dolientes encontrados",res);
	  result(null, res);
  });
};

Doliente.updateById = (id_doliente, doliente, result) => {
  sql.query(
    "UPDATE doliente SET marca_temporal = ?, primer_nombre = ?, apellido_paterno = ?, edad = ?, ciudad_pais = ?, numero_celular = ?, correo = ?, liga_url = ?, liga_id = ?, liga_password = ?, preferencia_de_horario = ?, medio_de_enterarse = ?, quieres_recibir_info = ? WHERE id_doliente = ?",
    [doliente.marca_temporal, doliente.primer_nombre, doliente.apellido_paterno, doliente.edad, doliente.ciudad_pais, doliente.numero_celular, doliente.correo, doliente.liga_url, doliente.liga_id, doliente.liga_password, doliente.preferencia_de_horario, doliente.medio_de_enterarse, doliente.quieres_recibir_info, id_doliente],
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

      console.log("doliente: actualizado", { id: id_doliente, ...doliente });
      result(null, { id: id_doliente, ...doliente });
    }
  );
};

Doliente.remove = (id_doliente, result) => {
  sql.query("DELETE FROM doliente WHERE id_doliente = ?", id_doliente, (err, res) => {
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

    console.log("doliente borrado con id: ", id_doliente);
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

Doliente.findNotEscucha = result => {
  sql.query("SELECT d.id_doliente, d.primer_nombre, d.apellido_paterno, d.edad FROM doliente d LEFT JOIN escucha e USING(id_doliente) WHERE e.id_doliente IS NULL", (err, res) => {
    if (err) {
      console.log("Error: ", err);
      result(null, err);
      return;
    }
	  console.log("dolientes sin escucha encontrados",res);
	  result(null, res);
  });
};

module.exports = Doliente;