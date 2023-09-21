const { DataTypes } = require("sequelize");
const connection = require("../db/connection");

// Class on db entry info
const Book = connection.define("Book", {
    title: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
    }
});

module.exports = Book;