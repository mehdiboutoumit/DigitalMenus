const dishService = require("../services/dishService.js");

exports.createDish = async (req, res, next) => {
  const {
    body: dish,
    file,
    // user: connectedUser
  } = req;
  if (file?.size) {
    if (file.size > 15000000) {
      return res.json({ message: "file is too large , 15 Mo max" });
    }
    dish.image = file.filename;
  } else {
    dish.image = null;
  }
  const {
    name,
    description,
    is_sold_out,
    preparation_time,
    price,
    calories,
    id_category,
    image,
  } = dish;
  const newDish = await dishService.createDish({
    name,
    image: image,
    description,
    is_sold_out,
    preparation_time,
    price,
    calories,
    id_category,
  });
  return res.json({ message: "success", dish: newDish });
};
exports.getAllDishes = async (req, res, next) => {
  const dishes = await dishService.getAllDishes();
  return res.json({ message: "success", dishes });
};
exports.getAllDishesOfCategory = async (req, res, next) => {
  if (req.params?.idCategory) {
    const dishes = await dishService.getAllDishesOfCategory(
      req.params.idCategory
    );
    return res.json({ message: "success", dishes });
  } else {
    return res.json({ message: "there is no category with this id" });
  }
};
exports.getDishById = async (req, res, next) => {
  const { id } = req.params;
  const dish = await dishService.getDishById(id);
  if (dish !== null) {
    return res.json({ message: "success", dish });
  } else {
    return res.json({ message: "there is no dish with this id" });
  }
};
exports.updateDish = async (req, res, next) => {
  const { body: dish } = req;
  const { id } = req.params;
  // if there is a file
  if (req.file) {
    const { file } = req;
    if (file.size > 15000000) {
      return res.json({ message: "file is too large , 15 Mo max" });
    } else {
      dish.image = file.filename;
    }
  }
  await dishService.updateDish(id, dish);
  return res.json({ message: "success" });
};
