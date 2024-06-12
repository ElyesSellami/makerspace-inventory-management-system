const sequelize = require("../config");
const Part = require("./part");
const User = require("./user");
const Project = require("./project");
const Request = require("./request");
const ProjectEnrolment = require("./projectEnrolment");

//Project focused associations
Project.hasOne(User, { foreignKey: "userid", sourceKey: "professorid" });
User.hasMany(Project, { foreignKey: "projectid" });

Part.belongsTo(Project, { foreignKey: "projectid" });
Project.hasMany(Part, { foreignKey: "partid" });

//Associations concerning Request
Request.belongsTo(User, {
  foreignKey: "requesterid",
  as: "requester",
  targetKey: "userid",
});
User.hasMany(Request, { foreignKey: "requesterid", sourceKey: "userid" });

Request.belongsTo(User, {
  foreignKey: "superuserid",
  as: "superuser",
  targetKey: "userid",
});
User.hasMany(Request, { foreignKey: "superuserid", sourceKey: "userid" });

Request.hasOne(Part, { foreignKey: "partid" });
Part.belongsToMany(Request, { foreignKey: "requestid" });

Request.hasOne(Project, { foreignKey: "projectid" });
Project.hasMany(Request, { foreignKey: "requestid" });

//ProjectEnrolment associations
User.belongsToMany(Project, {
  through: ProjectEnrolment,
  foreignKey: "projectid",
});
Project.belongsToMany(User, {
  through: ProjectEnrolment,
  foreignKey: "studentid",
});

module.exports = {
  Part,
  User,
  Project,
  ProjectEnrolment,
  Request,
  sequelize,
};
