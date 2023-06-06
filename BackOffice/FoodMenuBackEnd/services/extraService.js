const { Extra } = require("../models");

exports.createExtra = async (extra) => {
  const { dataValues } = await Extra.create(extra);
  const newExtra = {
    id: dataValues.id,
    name: dataValues.name,
    price: dataValues.price,
    id_dish: dataValues.id_dish,
  };
  return newExtra;
};

exports.getAllExtras = async () => {
  let extras = await Extra.findAll();
  if (extras == null) {
    return [];
  }

  extras = extras.map((extra) => {
    return {
      id: extra.dataValues.id,
      name: extra.dataValues.name,
      price: extra.dataValues.price,
      id_dish: extra.dataValues.id_dish,
    };
  });
  return extras;
};
exports.getAllExtrasOfDish = async (idDish) => {
  let extras = await Extra.findAll({
    where: {
      id_dish: idDish,
    },
  });
  if (extras == null) {
    return [];
  }

  extras = extras.map((extra) => {
    return {
      id: extra.dataValues.id,
      name: extra.dataValues.name,
      price: extra.dataValues.price,
      id_dish: extra.dataValues.id_dish,
    };
  });
  return extras;
};
exports.getExtraById = async (id) => {
  const data = await Extra.findByPk(id);
  if (!data) {
    return null;
  } else {
    return data.dataValues;
  }
};
exports.updateExtra = async (id, body) => {
  await Extra.update(body, {
    where: {
      id: id,
    },
  });
};
