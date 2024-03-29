const sql = require("../config/db.js");

// constructor
const Voluntario = function(voluntario) {
  this.id_voluntario = voluntario.id_voluntario
  this.id_celula = voluntario.id_celula;
  this.nombre = voluntario.nombre;
  this.apellido = voluntario.apellido;
  this.numero_celular = voluntario.numero_celular;
  this.fecha_nacimiento = voluntario.fecha_nacimiento;
  this.correo = voluntario.correo;
  this.ciudad_pais = voluntario.ciudad_pais;
};

Voluntario.create = (newVoluntario, result) => {
  sql.query("INSERT INTO voluntario SET ?", newVoluntario, (err, res) => {
    if (err) {
      console.log("Error: ", err);
      result(err, null);
      return;
    }
    console.log("voluntario creada: ", { id: res.id_voluntario, ...newVoluntario });
    result(null, { id: res.id_voluntario, ...newVoluntario });
  });
};

Voluntario.findById = (id, result) => {
  sql.query(`SELECT * FROM voluntario WHERE id_voluntario = ${id}`, (err, res) => {
    if (err) {
      console.log("Error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("voluntario encontrada: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found Example with the id
    result({ kind: "not_found" }, null);
  });
};
	
Voluntario.getAll = result => {
  sql.query("SELECT * FROM voluntario v, celula c WHERE v.id_celula = c.id_celula", (err, res) => {
    if (err) {
      console.log("Error: ", err);
      result(null, err);
      return;
    }
	  console.log("voluntarios encontradas",res);
	  result(null, res);
  });
};

Voluntario.updateById = (id_voluntario, voluntario, result) => {
  sql.query("UPDATE voluntario SET id_celula = ?, nombre = ?, apellido = ?, numero_celular = ?,fecha_nacimiento = ?, correo = ?, ciudad_pais = ? WHERE id_voluntario = ?",
    [voluntario.id_celula, voluntario.nombre, voluntario.apellido, voluntario.numero_celular,voluntario.fecha_nacimiento,voluntario.correo,voluntario.ciudad_pais,id_voluntario],
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

      console.log("voluntario: actualizada", { id: id_voluntario, ...voluntario });
      result(null, { id: id_voluntario, ...voluntario });
    }
  );
};

Voluntario.remove = (id_voluntario, result) => {
  sql.query("DELETE FROM voluntario WHERE id_voluntario = ?", id_voluntario, (err, res) => {
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

    console.log("voluntario borrada con id: ", id_voluntario);
    result(null, res);
  });
};

Voluntario.removeAll = result => {
  sql.query("DELETE FROM voluntario", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} voluntarios`);
    result(null, res);
  });
};

module.exports = Voluntario;
