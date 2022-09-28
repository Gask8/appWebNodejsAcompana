const sql = require("./db.js");

// constructor
const Example = function(example) {
  this.nombre = example.nombre;
  this.rfc = example.rfc;
};

Example.create = (newExample, result) => {
  sql.query("INSERT INTO examples SET ?", newExample, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    console.log("created example: ", { id: res.insertId, ...newExample });
    result(null, { id: res.insertId, ...newExample });
  });
};

Example.findById = (exampleId, result) => {
  sql.query(`SELECT * FROM examples WHERE id = ${exampleId}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found example: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found Example with the id
    result({ kind: "not_found" }, null);
  });
};

Example.getAll = result => {
  sql.query("SELECT * FROM examples", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }
	  console.log("found all examples: ");
    // console.log("examples: ", res);
    result(null, res);
  });
};

Example.updateById = (id, example, result) => {
  sql.query(
    "UPDATE examples SET nombre = ?, rfc = ?, WHERE id = ?",
    [example.nombre, example.rfc, id],
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

      console.log("updated example: ", { id: id, ...example });
      result(null, { id: id, ...example });
    }
  );
};

Example.remove = (id, result) => {
  sql.query("DELETE FROM examples WHERE id = ?", id, (err, res) => {
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

    console.log("deleted example with id: ", id);
    result(null, res);
  });
};

Example.removeAll = result => {
  sql.query("DELETE FROM examples", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} examples`);
    result(null, res);
  });
};

module.exports = Example;