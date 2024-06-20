const sequelize = require("../config/config");
const { DataTypes } = require('sequelize');
const bcrypt = require("bcrypt");

const encryptPass = async (user) => {
  if (user.password) {
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
  }
};

const User = sequelize.define(
  "User",
  {
    userid: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    emailAddress: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    accountType: {
      type: DataTypes.ENUM,
      values: ["admin", "superuser", "professor", "student"],
      allowNull: false,
      defaultValue: "student",
    },
  },
  {
    hooks: {
      beforeCreate: encryptPass,
      beforeUpdate: encryptPass,
    },
  }
);

module.exports = User;
