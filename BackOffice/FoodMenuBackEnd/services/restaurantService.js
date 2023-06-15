const { Restaurant } = require("../models");

exports.createRestaurant = async (restaurant) => {
  const { dataValues } = await Restaurant.create(restaurant);
  const newRestaurant = {
    id: dataValues.id,
    name: dataValues.name,
    image: dataValues.image,
    address: dataValues.address,
    description: dataValues.description,
    id_admin: dataValues.id_admin,
  };
  return newRestaurant;
};
exports.getAllRestaurants = async () => {
  let restaurants = await Restaurant.findAll();
  if (restaurants == null) {
    return [];
  }

  restaurants = restaurants.map((restaurant) => {
    return {
      id: restaurant.dataValues.id,
      name: restaurant.dataValues.name,
      image: restaurant.dataValues.image,
      address: restaurant.dataValues.address,
      description: restaurant.dataValues.description,
      id_admin: restaurant.dataValues.id_admin,
    };
  });
  return restaurants;
};
exports.updateRestaurant = async (id, body) => {
  console.log("service");
  await Restaurant.update(body, {
    where: {
      id: id,
    },
  });
};
exports.deleteRestaurant = async (id) => {
  const restaurant = await Restaurant.destroy({
    where: {
      id: id,
    },
  });
  return restaurant;
};

exports.getRestaurantById = async (id) => {
  const data = await Restaurant.findByPk(id);
  if (!data) {
    return null;
  } else {
    return data.dataValues;
  }
};
