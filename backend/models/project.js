const { sequelize } = require("../config/config");

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
      references: {
        model: User,
        key: "userid",
      },
    },
  },
  {}
);

module.exports = Project;
