const { Restaurant, Menu, Table } = require("../models");
const menuService = require('../services/menuService');

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
exports.getAllRestaurantsOfAdmin = async (adminId) => {
  let restaurants = await Restaurant.findAll({
    where: {
      id_admin: adminId,
    },
  });
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

   // Find and destroy tables related to the restaurant
   await Table.destroy({
    where: {
      id_restaurant: id,
    },
  });

  // Find and delete menus related to the restaurant
  const menus = await Menu.findAll({
    where: {
      id_restaurant: id,
    },
  });

  for (const menu of menus) {
    await menuService.deleteMenu(menu.id);
  }
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
