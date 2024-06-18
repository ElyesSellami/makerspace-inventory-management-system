const { DataTypes, NOW } = require("sequelize");
const sequelize = require("../config/config");
const { User, Part, Project } = require('./index')

const Request = sequelize.define(
  "Request",
  {
    requestid: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    partid: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    requesterid: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    superuserid: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    projectid: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    decision: {
      type: DataTypes.ENUM,
      allowNull: false,
      values: ['pending', 'accepted', 'rejected'],
      defaultValue: 'pending'
    },
    requestDate: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: NOW,
    },
    loanDate: {
        type: DataTypes.DATEONLY,
        allowNull: false,
        defaultValue: NOW,
    },
    returnDate: {
        type: DataTypes.DATEONLY,
        allowNull: false,
    },
  },
  {}
);

module.exports = Request;
