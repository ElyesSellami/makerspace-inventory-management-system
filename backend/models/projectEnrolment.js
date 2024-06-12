const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/config");

const ProjectEnrolment = sequelize.define(
  "ProjectEnrolment",
  {
    projectid: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Project,
        key: "projectid",
      },
    },
    studentid: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: User,
        key: "userid",
      },
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
