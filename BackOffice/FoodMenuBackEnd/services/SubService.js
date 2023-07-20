const { Sub, sub } = require("../models");

exports.createSub = async (Sub) => {
  const { name, email,  id_restaurant , points } = Sub;

  const { dataValues } = await Sub.create({
    name,
    email,
    id_restaurant,
    points

  });
  const newSub = {
    name: dataValues.name,
    email: dataValues.email,
    id: dataValues.id,
    id_restaurant,
    points
 
  };
  return newSub;
};

exports.findSubByEmail = async (email) => {
  const data = await Sub.findOne({
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
exports.getSubById = async (id) => {
  const data = await Sub.findOne({
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
exports.getAllSubs = async (id) => {
  let Subs = await Sub.findAll({
    include: "sub",
  });
  if (Subs == null) {
    return [];
  }
  Subs = Subs.map((Sub) => {
    return {
        id: sub.dataValues.id,
        name: sub.dataValues.name,
        email: sub.dataValues.email,
        points : sub.dataValues.points,
        id_restaurant : sub.dataValues.id_restaurant
    };
  });
  return Subs;
};
exports.getAllSubsOfRestaurant = async (idRestaurant) => {
  let Subs = await Sub.findAll({
    where: {
      id_restaurant: idRestaurant,
    },
  });
  if (Subs == null) {
    return [];
  }
  Subs = Subs.map((sub) => {
    return {
      id: sub.dataValues.id,
      name: sub.dataValues.name,
      email: sub.dataValues.email,
      points : sub.dataValues.points,
      id_restaurant : sub.dataValues.id_restaurant
    };
  });
  return Subs;
};
exports.getSubWithRefreshToken = async (refreshToken) => {
  const data = await Sub.findOne({
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
exports.updateSub = async (id, body) => {
  await Sub.update(body, {
    where: {
      id: id,
    },
  });
};
exports.findSubById = async (id) => {
  const data = await Sub.findByPk(id);
  if (!data) {
    return null;
  } else {
    return data.dataValues;
  }
};
