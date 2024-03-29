const { Menu  , Category} = require("../models");
const categoryService = require("../services/categoryService");

exports.createMenu = async (menu) => {
  const { dataValues } = await Menu.create(menu);
  const newMenu = {
    id: dataValues.id,
    name: dataValues.name,
    image: dataValues.image,
    description: dataValues.description,
    id_restaurant: dataValues.id_restaurant,
  };
  return newMenu;
};

exports.getAllMenus = async () => {
  let menus = await Menu.findAll();
  if (menus == null) {
    return [];
  }

  menus = menus.map((menu) => {
    return {
      id: menu.dataValues.id,
      name: menu.dataValues.name,
      image: menu.dataValues.image,
      description: menu.dataValues.description,
      id_restaurant: menu.dataValues.id_restaurant,
    };
  });
  return menus;
};
exports.getAllMenusOfRestaurant = async (idRestaurant) => {
  let menus = await Menu.findAll({
    where: {
      id_restaurant: idRestaurant,
    },
  });
  if (menus == null) {
    return [];
  }

  menus = menus.map((menu) => {
    return {
      id: menu.dataValues.id,
      name: menu.dataValues.name,
      image: menu.dataValues.image,
      description: menu.dataValues.description,
      id_restaurant: menu.dataValues.id_restaurant,
    };
  });
  return menus;
};
exports.getMenuById = async (id) => {
  const data = await Menu.findByPk(id);
  if (!data) {
    return null;
  } else {
    return data.dataValues;
  }
};
exports.updateMenu = async (id, body) => {
  await Menu.update(body, {
    where: {
      id: id,
    },
  });
};


exports.deleteMenu = async (id) => {
  const menu = await Menu.findByPk(id);
  if (!menu) {
    return null; // Menu not found
  }

  const categories = await Category.findAll({
    where: {
      id_menu: id,
    },
  });

  for (const category of categories) {
    await categoryService.deleteCategoryAndDishes(category.id);
  }

  await menu.destroy();

  return menu.dataValues;
};