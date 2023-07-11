const restaurantService = require("../services/restaurantService");

exports.createRestaurant = async (req, res, next) => {
  const { body: restaurant, file, user: connectedUser } = req;

  if (file) {
    console.log("file",file);
    if (file.size > 15000000) {
      return res.json({ message: "file is too large, 15 MB max" });
    }
    restaurant.image = file.filename;
  } else {
    restaurant.image = "not name";
  }

  const { id, name, address, description, image } = restaurant;
  const newRestaurant = await restaurantService.createRestaurant({
    id,
    name,
    image ,
    address,
    description,
    // id_admin: connectedUser.id,
  });

  return res.json({ message: "success", restaurant: newRestaurant });
};
exports.getAllRestaurants = async (req, res, next) => {
  const restaurants = await restaurantService.getAllRestaurants();
  return res.json({ message: "success", restaurants });
};
exports.getAllResraurantsOfAdmin = async (req, res, next) => {
  if (req.params?.adminId) {
    const restaurants = await restaurantService.getAllRestaurantsOfAdmin(
      req.params.adminId
    );
    return res.json({ message: "success", restaurants });
  } else {
    return res.json({ message: "there is no restaurant with this id" });
  }
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
  const { body: restaurant, file, user: connectedUser } = req;
  const id = restaurant.id;

  if (file) {
    console.log("file",file);
    if (file.size > 15000000) {
      return res.json({ message: "file is too large, 15 MB max" });
    }
    restaurant.image = file.filename;
 
 // const obj = { name : restaurant.name, image : restaurant.image, description : restaurant.description, address :  restaurant.address};
 const {  name, address, description, image } = restaurant; 
 await restaurantService.updateRestaurant(id, {
  
  name,
  image ,
  address,
  description,
  // id_admin: connectedUser.id,
});
} 
else {
  const {  name, address, description } = restaurant; 
 await restaurantService.updateRestaurant(id, {
  
  name,
  address,
  description,
  // id_admin: connectedUser.id,
});
    
}
  return res.json({ message: "success" });
};
exports.deleteRestaurant = async (req, res, next) => {
  const { id } = req.params;
  await restaurantService.deleteRestaurant(id);
  return res.json({ message: "success" });
};
