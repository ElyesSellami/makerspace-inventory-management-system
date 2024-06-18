const sequelize = require("../config/config");
const Project = require('./project');
const { DataTypes } = require('sequelize');

const Part = sequelize.define(
  "Part",
  {
    partid: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    reference: {
      type: DataTypes.STRING(10),
      allowNull: false,
    },
    availability: {
      type: DataTypes.ENUM,
      values: ["available", "unavailable", "repair"],
      allowNull: false,
      defaultValue: "available",
    },
    projectid: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    price: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    pictureurl: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    quotationurl: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {}
);

module.exports = Part;
