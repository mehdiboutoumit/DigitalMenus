const { Dish } = require("../models");

exports.createDish = async (dish) => {
  const { dataValues } = await Dish.create(dish);
  const newDish = {
    id: dataValues.id,
    name: dataValues.name,
    image: dataValues.image,
    description: dataValues.description,
    is_sold_out: dataValues.is_sold_out,
    preparation_time: dataValues.preparation_time,
    price: dataValues.price,
    calories: dataValues.calories,
    id_category: dataValues.id_category,
  };
  console.log("service check");
  return newDish;
};
exports.getAllDishes = async () => {
  let dishes = await Dish.findAll();
  if (dishes == null) {
    return [];
  }

  dishes = dishes.map((dish) => {
    return {
      id: dish.dataValues.id,
      name: dish.dataValues.name,
      image:  Buffer.from(dish.image, 'base64'),
      description: dish.dataValues.description,
      is_sold_out: dish.dataValues.is_sold_out,
      preparation_time: dish.dataValues.preparation_time,
      price: dish.dataValues.price,
      calories: dish.dataValues.calories,
      id_category: dish.dataValues.id_category,
    };
  });
  return dishes;
};
exports.getAllDishesOfCategory = async (idCategory) => {
  let dishes = await Dish.findAll({
    where: {
      id_category: idCategory,
    },
  });
  if (dishes == null) {
    return [];
  }

  dishes = dishes.map((dish) => {
    return {
      id: dish.dataValues.id,
      name: dish.dataValues.name,
      image: dish.image,
      description: dish.dataValues.description,
      is_sold_out: dish.dataValues.is_sold_out,
      preparation_time: dish.dataValues.preparation_time,
      price: dish.dataValues.price,
      calories: dish.dataValues.calories,
      id_category: dish.dataValues.id_category,
    };
  });
  return dishes;
};
exports.getDishById = async (id) => {
  const data = await Dish.findByPk(id);
  if (!data) {
    return null;
  } else {
    return data.dataValues;
  }
};
exports.updateDish = async (id, body) => {
  await Dish.update(body, {
    where: {
      id: id,
    },
  });
};
exports.deleteDish = async (id) => {
  await Dish.destroy({
    where: {
      id: id,
    },
  });
};