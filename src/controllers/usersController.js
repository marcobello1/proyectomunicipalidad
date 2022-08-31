const Users = require('../database/models/user');
const db = require('../database/models');
const bcrypt = require("bcryptjs");
const { validationResult } = require('express-validator');

let encryptPassword = (password) => {
    return bcrypt.hashSync(password, 10);
  };
  
  let comparePasswords = (password, ecryptedPassword) => {
    return bcrypt.compareSync(password, ecryptedPassword);
  };
const sequelize = Users.sequelize
let usersController = {
    //Proceso del registro
    register: function (req, res) {
        res.render('registro', { title: 'registrate gratis'})
    },
   
    crearUsuario: function(req,res) {
        let errores = validationResult(req);
        let oldData= req.body;
        if (!errores.isEmpty()) {
            return res.render('registro', {
                errores: errores.mapped(),
                oldData: oldData
            })
        }
        db.users.findOrCreate({
            where: {
                nombre: req.body.nombre,
                
            },
            defaults: {
                dni: req.body.dni,
                email: req.body.email,                         
                password: encryptPassword(req.body.contraseña),
             
                domicilio: req.body.domicilio,
                telefono: req.body.telefono,
                tipousuario:'usuario',
            }            
        }).then(([newUser, created]) => {
            if(!created) {
              return res.render("registro", {
                title: "Error en la registracion",
                errores: {
                    nombre: {
                      msg: "Lo lamentamos, este nombre pertenece a un usuario ya registrado",
                    }
                  },
                oldData: oldData,
              });
            }
            res.render("login", {
              title: "Bienvenido!",
              newUserName: req.body.name,
            });
          });
       
    },
    //Fin del proceso de registro
    //Proceso de login
    login: function(req,res) {
        res.render('login', {title: 'ingresá a tu cuenta'})
    },
    inicioSesion: function(req,res) {
        let errores = validationResult(req);
        let oldData= req.body;
        if (!errores.isEmpty()) {
            return res.render('login', {
                errores: errores.mapped(),
                oldData: oldData
            })
        }
        db.users.findOne({where:{nombre:req.body.nombre}})
        .then((userToLogin) => {
            if (userToLogin) {
                if (comparePasswords(req.body.contraseña, userToLogin.password)) {
                    delete userToLogin.password;
                    req.session.loggedUser = userToLogin;
                    console.log('EL USUARIO LOGEADO ES')
                    console.log(req.session)
                    return res.redirect("/users/perfilusuario");
                  }                
                  return res.render("login", {
                    errores: {
                      contraseña: {
                        msg: "La contraseña es incorrecta",
                      },
                    },
                    oldData: oldData,
                  });

            }
            return res.render('login', {
                errores: {
                    nombre: {
                        msg: "Esta persona no esta registrada"
                    },
                    contraseña: {
                        msg: "esta contraseña no esta registrada"
                    }
                }
            })
        })
    },
    //Fin del proceso del login
    //Cerrar sesion
    cerrarSesion: function (req,res) {
        req.session.destroy();
        console.log('esto está en sesión');
        console.log(req.session)
        res.redirect('/users/login')
    },
    //Inicio CRUD usuarios
     listaUsuarios: function (req, res) {
       db.users.findAll()
       .then(function(users) {
        res.render('listausuarios', {users: users})
       })
    },
    detalleUsuarios: function (req,res) {
       db.users.findByPk(req.params.id)
       .then(function (users) {
        res.render('detalleusuarios', {users:users})
       })
    },
    editarUsuario: function (req, res) {
        db.users.findByPk(req.params.id)
        .then(function(users) {
            res.render('editarusuario', {users:users})
        })
    },
    updateUsuario: function (req,res) {
       
        db.users.update({
            nombre: req.body.nombre,
            email: req.body.email,
            password: encryptPassword(req.body.contraseña),
            dni: req.body.dni,
            domicilio: req.body.domicilio,
            telefono: req.body.telefono,
            tipousuario: req.body.usertype,
        }, {
            where: {
                id: req.params.id,
            }
        });
        res.redirect('/users/listarusuarios');
    },
    borrarUsuario: function (req, res) {
        db.users.destroy({
            where: {
                id: req.params.id,
            }
        });
        res.redirect('/users/listarusuarios');
    },
    //Fin CRUD usuarios
    perfilUsuario: function (req, res) {
        let user = req.session.loggedUser;
        return res.render("perfilusuario", {user: user});
    },
    algoSalioMal: function (req,res) {
        res.render("AlgoSalioMal")
    }
}
module.exports = usersController