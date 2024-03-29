const { Category, Dish } = require("../models");
const dishService = require('./dishService.js');

exports.createCategory = async (category) => {
  const { dataValues } = await Category.create(category);
  const newCategory = {
    id: dataValues.id,
    name: dataValues.name,
    image: dataValues.image,
    description: dataValues.description,
    id_menu: dataValues.id_menu,
  };
  return newCategory;
};

exports.getAllCategories = async () => {
  let categories = await Category.findAll();
  if (categories == null) {
    return [];
  }

  categories = categories.map((category) => {
    return {
      id: category.dataValues.id,
      name: category.dataValues.name,
      image: category.dataValues.image,
      description: category.dataValues.description,
      id_menu: category.dataValues.id_menu,
    };
  });
  return categories;
};
exports.getAllCategoriesOfMenu = async (idMenu) => {
  let categories = await Category.findAll({
    where: {
      id_menu: idMenu,
    },
  });
  if (categories == null) {
    return [];
  }
  console.log(categories)

  categories = categories.map((category) => {
  
    return {
      id: category.dataValues.id,
      name: category.dataValues.name,
      image: category.dataValues.image,
      description: category.dataValues.description,
      id_menu: category.dataValues.id_menu,
    };
  });
  return categories;
};
exports.getCategoryById = async (id) => {
  const data = await Category.findByPk(id);
  if (!data) {
    return null;
  } else {
    return data.dataValues;
  }
};
exports.updateCategory = async (id, body) => {
  await Category.update(body, {
    where: {
      id: id,
    },
  });
};

exports.deleteCategoryAndDishes = async (categoryId) => {
  // Delete the category and its related dishes in a transaction
  const dishes = await Dish.findAll({
    where: {
      id_category: categoryId,
    },
  });

  for (const dish of dishes) {
    await dishService.deleteDish(dish.id);
  }

  await Category.destroy({
    where: {
      id: categoryId,
    }
  });
};
