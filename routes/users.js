var express = require('express');
const { request } = require('../app');
var router = express.Router();
const usersController=require('../src/controllers/usersController')
const validacionesregistro = require('../src/middlewares/registervalidatio')
const validacioneslogin = require('../src/middlewares/loginvalidation')
const guestMiddleware = require('../src/middlewares/guestMiddleware')
/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});
/* Formulario de creación de usuario. */
router.get('/register', usersController.register);
router.post('/register', validacionesregistro, usersController.crearUsuario);
/* Formulario de login de usuario. */
router.get('/login', usersController.login);
router.post('/iniciosesion', validacioneslogin, usersController.inicioSesion)
/* registro exitoso/* Formulario de creación de usuario. */
router.get("/listarusuarios", guestMiddleware, usersController.listaUsuarios);
router.get("/listarusuarios/:id", usersController.detalleUsuarios);
router.get("/perfilusuario", usersController.perfilUsuario)
router.get("/editar/:id", usersController.editarUsuario);
router.post("/editar/:id", validacionesregistro, usersController.updateUsuario);
router.post("/borrar/:id", usersController.borrarUsuario);
router.get("/algosaliomal", usersController.algoSalioMal)
/* Cerrar sesión*/
router.get("/cerrarsesion", usersController.cerrarSesion)
module.exports = router;
