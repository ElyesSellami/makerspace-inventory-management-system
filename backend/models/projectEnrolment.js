const { DataTypes } = require("sequelize");
const sequelize = require("../config/config");
const { User, Project } = require('./index');

const ProjectEnrolment = sequelize.define(
  "ProjectEnrolment",
  {
    projectid: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    studentid: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    freezeTableName: true,
    indexes: [
      {
        unique: true,
        fields: ["projectid", "studentid"],
      },
    ],
  }
);

module.exports = ProjectEnrolment;
