const sql = require("../config/db.js");
const bcrypt = require('bcrypt');

const Usuario = function(user) {
    this.id_usuario = user.id_usuario;
    this.email = user.email;
    this.password = user.password;
};

Usuario.findById = (userEmail, result) => {
    sql.query(`SELECT * FROM usuario WHERE email = '${userEmail.email}'`, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
  
      if (res.length) {
        console.log("found user: ", res[0]);
        result(null, res[0]);
        return;
      }
  
      // not found Customer with the id
      result({ kind: "not_found" }, null);
    });
  };


// FIND ELEMENT
exports.findOne = (req, res) => {
	
    const user = new Usuario({
        id_usuario: req.body.id_usuario,
        email: req.body.email,
        password: req.body.password
    });
  
      
    Usuario.findById(user, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          req.flash('wrong','Usuario o Password inexistente');
          res.status(404).redirect('/');
        } else {
          res.status(500).send({
            message: "Error retrieving User with id " + req.body.id_usuario
          });
        }
      } 
        else {

          bcrypt.compare(user.password, data.password, async function (err, isMatch) {
              if (err) {
                console.log(err);
              }
              // Comparing the original password to
              // encrypted password   
              if (isMatch) {

                req.session.id = data.id_usuario;
                req.session.email = data.email;
                req.flash('success','Bienvenido')
                res.redirect('/')

              }

              if (!isMatch) {
                  req.flash('wrong','Usuario o contrasena mala')
                  res.redirect('/')
              }
            })

            // if(data.password==user.password){
            //     req.session.id = data.id_usuario;
            //     req.session.email = data.email;
                
            //     req.flash('success','Bienvenido')
            //     res.redirect('/')

  
            // } else {
            //     req.flash('wrong','Usuario o contrasena mala')
            //     res.redirect('/')
            // }
        }
    });
};
  