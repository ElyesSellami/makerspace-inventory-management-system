const sequelize = require('../config/config');
const User = require('./user');
const Project = require('./project');
const Part = require('./part');
const Request = require('./request');
const ProjectEnrolment = require('./projectEnrolment');

// Define associations in a function
const associateModels = () => {
  // Project and User Associations
  Project.belongsTo(User, { foreignKey: 'professorid' });
  User.hasMany(Project, { foreignKey: 'professorid' });

  // Part and Project Associations
  Part.belongsTo(Project, { foreignKey: 'projectid' });
  Project.hasMany(Part, { foreignKey: 'projectid' });

  // Request and User Associations
  Request.belongsTo(User, {
    foreignKey: 'requesterid',
    as: 'requester',
    targetKey: 'userid',
  });
  User.hasMany(Request, { foreignKey: 'requesterid', sourceKey: 'userid' });

  Request.belongsTo(User, {
    foreignKey: 'superuserid',
    as: 'superuser',
    targetKey: 'userid',
  });
  User.hasMany(Request, { foreignKey: 'superuserid', sourceKey: 'userid' });

  // Request and Part Associations
  Request.belongsTo(Part, { foreignKey: 'partid' });
  Part.hasMany(Request, { foreignKey: 'partid' });

  // Request and Project Associations
  Request.belongsTo(Project, { foreignKey: 'projectid' });
  Project.hasMany(Request, { foreignKey: 'projectid' });

  // ProjectEnrolment Associations
  User.belongsToMany(Project, {
    through: ProjectEnrolment,
    foreignKey: 'userid',
  });
  Project.belongsToMany(User, {
    through: ProjectEnrolment,
    foreignKey: 'projectid',
  });
};

// Initialize associations
associateModels();

module.exports = {
  sequelize,
  User,
  Project,
  Part,
  Request,
  ProjectEnrolment,
};