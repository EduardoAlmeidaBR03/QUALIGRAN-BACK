const Sequelize = require('sequelize');
const database = require('../db/db');

const Chapa = database.define('chapa', {
    id_chapa: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    nome: {
        type: Sequelize.STRING,
        allowNull: false
    },
    link: {
        type: Sequelize.STRING,
        allowNull: false
    },
    qualidade: {
        type: Sequelize.STRING,
        allowNull: false
    },
    preco: {
        type: Sequelize.DECIMAL(10, 2), // Consider using DECIMAL for prices
        allowNull: false
    }
}, {
    tableName: 'chapas' // Name of the table in the database
});

module.exports = Chapa;
