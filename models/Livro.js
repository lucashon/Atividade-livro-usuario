const { DataTypes } = require('sequelize')
const db = require('../db/conn')

/**
 * DREATE TABLE User(
 * name VARCHAR(255) NOT NULL)
 * occupation VARCHAR(255) NOT NULL
 * newsletter BOOL
 * );
 */

const Livro = db.define('Livro',{
    autor: {
        type: DataTypes.STRING ,
        allowNull: false

    },
    titulo: {
        type: DataTypes.STRING ,
        require: true

    },
    capa: {
        type: DataTypes.BOOLEAN ,

    },
    preco: {
        type: DataTypes.STRING ,
        require: true

    }
});


module.exports = Livro