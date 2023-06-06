const roleService = require("../services/roleService");

exports.createRole = async (req, res, next) => {
  const { role } = req.body;
  const newRole = await roleService.createRole(role);
  return res.json({ message: "success", role: newRole });
};
exports.getAllRoles = async (req, res, next) => {
  const roles = await roleService.findAllRoles();
  return res.json({ message: "success", role: roles });
};
