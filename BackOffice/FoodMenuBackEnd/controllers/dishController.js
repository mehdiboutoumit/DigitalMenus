const dishService = require("../services/dishService.js");

exports.createDish = async (req, res, next) => {
  const {
    body: dish,
    file,
    // user: connectedUser
  } = req;

  if (file?.size) {
    if (file.size > 15000000) {
      return res.json({ message: "file is too large, 15 Mo max" });
    }
    dish.image = file.filename;
  } else {
    dish.image = null;
  }

  const {
    id,
    name,
    description,
    is_sold_out,
    preparation_time,
    price,
    calories,
    id_category,
    image,
  } = dish;

  try {
    let existingDish = await dishService.getDishById(id);

    if (existingDish) {
      // Dish already exists, update it instead of creating a new one
      existingDish = await dishService.updateDish(id, {
        name,
        image,
        description,
        is_sold_out,
        preparation_time,
        price,
        calories,
        id_category,
      });

      return res.json({ message: "Dish updated successfully", dish: existingDish });
    }

    const newDish = await dishService.createDish({
      id,
      name,
      image,
      description,
      is_sold_out,
      preparation_time,
      price,
      calories,
      id_category,
    });

    return res.json({ message: "Dish created successfully", dish: newDish });
  } catch (error) {
    console.error("Error creating/updating dish:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
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

