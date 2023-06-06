const { Role } = require("../models");

exports.createRole = async (role) => {
  const { dataValues } = await Role.create({ role });
  const newRole = {
    id: dataValues.id,
    role: dataValues.role,
  };
  return newRole;
};
exports.findAllRoles = async (role) => {
  let roles = await Role.findAll();
  roles = roles.map((role) => {
    return {
      id: role.dataValues.id,
      role: role.dataValues.role,
    };
  });
  return roles;
};
