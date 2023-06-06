const { SuperAdmin } = require("../models");

exports.createSuperAdmin = async (superAdmin) => {
  const { name, email, password } = superAdmin;

  const { dataValues } = await SuperAdmin.create({ name, email, password });
  const newSuperAdmin = {
    name: dataValues.name,
    email: dataValues.email,
    id: dataValues.id,
  };
  return newSuperAdmin;
};

exports.findSuperAdminByEmail = async (email) => {
  const data = await SuperAdmin.findOne({
    where: {
      email: email,
    },
  });
  if (!data) {
    return null;
  } else {
    return data.dataValues;
  }
};
exports.getSuperAdminWithRefreshToken = async (refreshToken) => {
  const data = await SuperAdmin.findOne({
    where: {
      refresh_token: refreshToken,
    },
  });
  if (!data) {
    return null;
  } else {
    return data.dataValues;
  }
};
exports.updateSuperAdmin = async (id, body) => {
  await SuperAdmin.update(body, {
    where: {
      id: id,
    },
  });
};
exports.findSuperAdminById = async (id) => {
  const data = await SuperAdmin.findByPk(id);
  if (!data) {
    return null;
  } else {
    return data.dataValues;
  }
};
