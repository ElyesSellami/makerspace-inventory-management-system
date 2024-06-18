const sequelize = require("../config/config");
const User = require('./user');
const { DataTypes } = require('sequelize');

const Project = sequelize.define(
  "Project",
  {
    projectid: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    professorid: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {}
);

module.exports = Project;
