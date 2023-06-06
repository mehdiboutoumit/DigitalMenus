const { Admin } = require("../models");

exports.createAdmin = async (admin) => {
  const { name, email, password } = admin;

  const { dataValues } = await Admin.create({ name, email, password });
  const newAdmin = {
    name: dataValues.name,
    email: dataValues.email,
    id: dataValues.id,
  };
  return newAdmin;
};

exports.findAdminByEmail = async (email) => {
  const data = await Admin.findOne({
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
exports.getAdminWithRefreshToken = async (refreshToken) => {
  const data = await Admin.findOne({
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
exports.updateAdmin = async (id, body) => {
  await Admin.update(body, {
    where: {
      id: id,
    },
  });
};
exports.findAdminById = async (id) => {
  const data = await Admin.findByPk(id);
  if (!data) {
    return null;
  } else {
    return data.dataValues;
  }
};
