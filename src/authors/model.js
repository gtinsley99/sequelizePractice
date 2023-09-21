const { DataTypes } = require("sequelize");
const connection = require("../db/connection");

// Class on authors entry info
const Author = connection.define("Author", {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    }
});

module.exports = Author;