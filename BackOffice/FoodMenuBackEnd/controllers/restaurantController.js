const restaurantService = require("../services/restaurantService");

exports.createRestaurant = async (req, res, next) => {
  const { body: restaurant, file, user: connectedUser } = req;
  if (file?.size) {
    if (file.size > 15000000) {
      return res.json({ message: "file is too large , 15 Mo max" });
    }
    restaurant.image = file.file.name;
  } else {
    restaurant.image = null;
  }
  const { name, address, description, image } = restaurant;
  const newRestaurant = await restaurantService.createRestaurant({
    name,
    image,
    address,
    description,
    id_admin: connectedUser.id,
  });
  return res.json({ message: "success", restaurant: newRestaurant });
};
exports.getAllRestaurants = async (req, res, next) => {
  const restaurants = await restaurantService.getAllRestaurants();
  return res.json({ message: "success", restaurants });
};
exports.getRestaurantById = async (req, res, next) => {
  const { id } = req.params;
  const restaurant = await restaurantService.getRestaurantById(id);
  if (restaurant !== null) {
    return res.json({ message: "success", restaurant });
  } else {
    return res.json({ message: "there is no restaurant with this id" });
  }
};
exports.updateRestaurant = async (req, res, next) => {
  const { body: restaurant } = req;
  const { id } = req.params;
  // if there is a file
  if (req.file) {
    const { file } = req;
    if (file.size > 15000000) {
      return res.json({ message: "file is too large , 15 Mo max" });
    } else {
      restaurant.image = file.filename;
    }
  }
  await restaurantService.updateRestaurant(id, restaurant);
  return res.json({ message: "success" });
};
exports.deleteRestaurant = async (req, res, next) => {
  const { restaurant } = req.body;
  await restaurantService.deleteRestaurant(restaurant.id);
  return res.json({ message: "success" });
};
