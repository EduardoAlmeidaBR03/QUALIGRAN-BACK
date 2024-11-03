const Sequelize = require('sequelize');
const database = require('../db/db');

const tipoChapa = database.define('tipoChapa', {
    id_tipochapa: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    nome: {
        type: Sequelize.STRING,
        allowNull: false
    },
    preco: {
        type: Sequelize.DECIMAL(10, 2), // Consider using DECIMAL for prices
        allowNull: false
    }
}, {
    tableName: 'tipoChapas' // Name of the table in the database
});

module.exports = tipoChapa;
