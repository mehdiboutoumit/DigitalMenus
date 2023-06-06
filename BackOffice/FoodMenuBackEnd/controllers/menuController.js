const menuService = require("../services/menuService");

exports.createMenu = async (req, res, next) => {
  console.log(req.body);
  const {
    body: menu,
    file,
    // user: connectedUser
  } = req;
  if (file?.size) {
    if (file.size > 15000000) {
      return res.json({ message: "file is too large , 15 Mo max" });
    }
    menu.image = file.filename;
  } else {
    menu.image = null;
  }
  const { name, description, id_restaurant, image } = menu;
  const newMenu = await menuService.createMenu({
    name,
    image,
    description,
    id_restaurant,
  });
  return res.json({ message: "success", menu: newMenu });
};

exports.getAllMenus = async (req, res, next) => {
  const menus = await menuService.getAllMenus();
  return res.json({ message: "success", menus });
};
exports.getAllMenusOfRestaurant = async (req, res, next) => {
  if (req.params?.idRestaurant) {
    const menus = await menuService.getAllMenusOfRestaurant(
      req.params?.idRestaurant
    );
    return res.json({ message: "success", menus: menus });
  } else {
    return res.json({ message: "there is no restaurant with this id" });
  }
};
exports.getMenuById = async (req, res, next) => {
  const { id } = req.params;
  const menu = await menuService.getMenuById(id);
  if (menu !== null) {
    return res.json({ message: "success", menu });
  } else {
    return res.json({ message: "there is no menu with this id" });
  }
};
exports.updateMenu = async (req, res, next) => {
  const { body: menu } = req;
  const { id } = req.params;
  // if there is a file
  if (req.file) {
    const { file } = req;
    if (file.size > 15000000) {
      return res.json({ message: "file is too large , 15 Mo max" });
    } else {
      menu.image = file.filename;
    }
  }
  await menuService.updateMenu(id, menu);
  return res.json({ message: "success" });
};
