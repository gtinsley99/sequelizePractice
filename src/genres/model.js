const {DataTypes} = require("sequelize");
const connection = require("../db/connection");

const Genre = connection.define("Genre", {
    genre: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false
    },
});

module.exports = Genre;