const { User, Role } = require("../models");

exports.createUser = async (user) => {
  const { name, email, password, id_role,  id_restaurant , accessType } = user;

  const { dataValues } = await User.create({
    name,
    email,
    password,
    id_role,
    id_restaurant,
    accessType
  });
  const newUser = {
    name: dataValues.name,
    email: dataValues.email,
    id: dataValues.id,
    id_role,
    id_admin : 0,
    id_restaurant,
    accessType
  };
  return newUser;
};

exports.findUserByEmail = async (email) => {
  const data = await User.findOne({
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
exports.getUserById = async (id) => {
  const data = await User.findOne({
    where: {
      id: id,
    },
  });
  if (!data) {
    return null;
  } else {
    return data.dataValues;
  }
};
exports.getAllUsers = async (id) => {
  let users = await User.findAll({
    include: "Role",
  });
  if (users == null) {
    return [];
  }
  users = users.map((user) => {
    return {
      id: user.dataValues.id ,
      name: user.dataValues.name,
      email: user.dataValues.email,
      accessType : user.dataValues.accessType,
      role: user.dataValues.Role.role
    };
  });
  return users;
};
exports.getAllUsersOfRestaurant = async (idRestaurant) => {
  let users = await User.findAll({
    include: [
      {
        model: Role,
        // as: "Role",
        attributes: ["id", "role"],
      },
    ],
    where: {
      id_restaurant: idRestaurant,
    },
  });
  if (users == null) {
    return [];
  }
  users = users.map((role) => {
    return {
      id: role.dataValues.id,
      name: role.dataValues.name,
      email: role.dataValues.email,
      role: {
        id: role.dataValues.Role.id,
        role: role.dataValues.Role.role,
      },
    };
  });
  return users;
};
exports.getUserWithRefreshToken = async (refreshToken) => {
  const data = await User.findOne({
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
exports.updateUser = async (id, body) => {
  await User.update(body, {
    where: {
      id: id,
    },
  });
};
exports.findUserById = async (id) => {
  const data = await User.findByPk(id);
  if (!data) {
    return null;
  } else {
    return data.dataValues;
  }
};

exports.deleteUser = async (id) => {
  const user = await User.destroy({
    where: {
      id: id,
    },
  });
  return user;
};
