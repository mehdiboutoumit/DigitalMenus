const { Portion } = require("../models");

exports.createPortion = async (portion) => {
  const { dataValues } = await Portion.create(portion);
  const newPortion = {
    id: dataValues.id,
    name: dataValues.name,
    price: dataValues.price,
    calories: dataValues.calories,
    id_dish: dataValues.id_dish,
  };
  return newPortion;
};

exports.getAllPortions = async () => {
  let portions = await Portion.findAll();
  if (portions == null) {
    return [];
  }

  portions = portions.map((portion) => {
    return {
      id: portion.dataValues.id,
      name: portion.dataValues.name,
      price: portion.dataValues.price,
      calories: portion.dataValues.calories,
      id_dish: portion.dataValues.id_dish,
    };
  });
  return portions;
};
exports.getAllPortionsOfDish = async (idDish) => {
  let portions = await Portion.findAll({
    where: {
      id_dish: idDish,
    },
  });
  if (portions == null) {
    return [];
  }

  portions = portions.map((portion) => {
    return {
      id: portion.dataValues.id,
      name: portion.dataValues.name,
      price: portion.dataValues.price,
      calories: portion.dataValues.calories,
      id_dish: portion.dataValues.id_dish,
    };
  });
  return portions;
};
exports.getPortionById = async (id) => {
  const data = await Portion.findByPk(id);
  if (!data) {
    return null;
  } else {
    return data.dataValues;
  }
};
exports.updatePortion = async (id, body) => {
  await Portion.update(body, {
    where: {
      id: id,
    },
  });
};


exports.deletePortion = async (id) => {
  const portion = await Portion.destroy({
    where: {
      id: id,
    },
  });
  return portion;
};