module.exports = function (sequelize, dataTypes) {
    let alias = 'users';
    let cols = {
        id: {
            type: dataTypes.INTEGER(10).UNSIGNED,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        nombre: {
            type: dataTypes.STRING(40),
            allowNull: false
        },
        email:{
            type: dataTypes.STRING(40),
            allowNull: false
        },
        password:{
            type: dataTypes.STRING(225),
            allowNull: false,
        },
        dni:{
            type: dataTypes.INTEGER(10).UNSIGNED,
            allowNull: false},
        domicilio:{
            type: dataTypes.STRING(40),
            allowNull: false,
        },
        telefono: {
            type: dataTypes.INTEGER(20).UNSIGNED,
            allowNull: false},
         tipousuario:{
                type: dataTypes.STRING(40),
                allowNull: false},

    }
    let config = {
        tableName: "users",
        timestamps: false,
      };
      const users = sequelize.define(alias, cols, config);
      return users;

}