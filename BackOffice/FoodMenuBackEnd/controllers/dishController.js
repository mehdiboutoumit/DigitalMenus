const dishService = require("../services/dishService.js");

exports.createDish = async (req, res, next) => {
  const {
    body: dish,
    file
    // user: connectedUser
  } = req;

  if (file?.size) {
    if (file.size > 15000000) {
      return res.json({ message: "image is too large, 15 Mo max" });
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
      const updatedFields = {};

      if (name) updatedFields.name = name;
      if (image) updatedFields.image = image;
      if (description) updatedFields.description = description;
      if (is_sold_out) updatedFields.is_sold_out = is_sold_out;
      if (preparation_time) updatedFields.preparation_time = preparation_time;
      if (price) updatedFields.price = price;
      if (calories) updatedFields.calories = calories;
    
      // Dish already exists, update it instead of creating a new one
      existingDish = await dishService.updateDish(id, updatedFields);

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
  // if there is a image
  if (req.image) {
    const { image } = req;
    if (image.size > 15000000) {
      return res.json({ message: "image is too large , 15 Mo max" });
    } else {
      dish.image = image.imagename;
    }
  }
  await dishService.updateDish(id, dish);
  return res.json({ message: "success" });
};
exports.deleteDish = async (req, res, next) => {
  const { id } = req.params;

  try {
    await dishService.deleteDish(id);
    return res.json({ message: "Dish deleted successfully" });
  } catch (error) {
    console.error("Error deleting dish:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
