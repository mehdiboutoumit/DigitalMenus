const menuService = require("../services/menuService");

exports.createMenu = async (req, res, next) => {
  console.log(req.body);
  const {id, name, description, id_restaurant } = req.body;

  // if (req.image) {
  //   const image = req.image;
  //   if (image.size > 15000000) {
  //     return res.json({ message: "image is too large, maximum size is 15MB." });
  //   }
  // }
  const image = req.image;
  const newMenu = await menuService.createMenu({
    id,
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
  // if there is a image
  // if (req.image) {
  //   const { image } = req;
  //   if (image.size > 15000000) {
  //     return res.json({ message: "image is too large , 15 Mo max" });
  //   } else {
      menu.image = image;
  //  }
  //}
  await menuService.updateMenu(id, menu);
  return res.json({ message: "success" });
};



// exports.getLastMenuId = async (req, res) => {
//   try {
//     const lastId = await menuService.getMenuByLastId();

//     if (lastId !== null) {
//       res.json({ lastId: lastId });
//     } else {
//       res.json({ lastId: 0 }); // Return 0 if no records exist
//     }
//   } catch (error) {
//     console.error('Error retrieving last menu ID:', error);
//     res.status(500).json({ error: 'Internal server error' });
//   }
// };
exports.deleteMenu = async (req,res)=>{
  menuService.deleteMenu(req.params.id);
  return res.json({ message: "success" });
}
