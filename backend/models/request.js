const { DataTypes, NOW } = require("sequelize");
const { sequelize } = require("../config/config");

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
      references: {
        model: Part,
        key: "partid",
      },
    },
    requesterid: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: User,
        key: "userid",
      },
    },
    superuserid: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: User,
        key: "userid",
      },
    },
    projectid: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Project,
        key: "projectid",
      },
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
