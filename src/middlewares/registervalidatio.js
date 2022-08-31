const { body } = require('express-validator');
const path = require('path');
const validations = [
    body('nombre').notEmpty().withMessage("Tenés que escribir tu nombre"),
    body("email").notEmpty().withMessage("Debes escribir un email").isEmail().withMessage("Debes escribir un email válido"),
    body("contraseña").notEmpty().withMessage("Debes escribir una contraseña")
    .isStrongPassword({
        minLength: 8,
        minLowercase: 1,
        minUppercase: 1,
        minNumbers: 1,
        minSymbols: 0,
        returnScore: false,
      })
      .withMessage(
        "La contraseña debe contener al menos 8 caracteres, de los cuales debe haber al menos una minuscula, una mayúscula y un número"
      ),
    body('dni').notEmpty().withMessage("Debes ingresar tu dni"),
    body('domicilio').notEmpty().withMessage("Debes ingresar tu domicilio"),
    body('telefono').notEmpty().withMessage("Debes ingresar tu telefono"),
    ]
module.exports = validations;