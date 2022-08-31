const { body } = require('express-validator');
const path = require('path');
const validations = [
    body('nombre').notEmpty().withMessage("Tenés que escribir tu nombre"),
    body("contraseña").notEmpty().withMessage("Debes escribir una contraseña"),
    ]
module.exports = validations;