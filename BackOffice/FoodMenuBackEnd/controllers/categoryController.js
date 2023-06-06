const categoryService = require("../services/categoryService");

exports.createCategory = async (req, res, next) => {
  const {
    body: category,
    file,
    // user: connectedUser
  } = req;
  if (file?.size) {
    if (file.size > 15000000) {
      return res.json({ message: "file is too large , 15 Mo max" });
    } else {
      category.image = file.filename;
    }
  } else {
    category.image = null;
  }
  const { name, description, id_menu, image } = category;
  const newCategory = await categoryService.createCategory({
    name,
    image: image,
    description,
    id_menu,
    image,
  });
  return res.json({ message: "success", category: newCategory });
};

exports.getAllCategories = async (req, res, next) => {
  const categories = await categoryService.getAllCategories();
  return res.json({ message: "success", categories });
};
exports.getAllCategoriesOfMenu = async (req, res, next) => {
  if (req.params?.idMenu) {
    const categories = await categoryService.getAllCategoriesOfMenu(
      req.params.idMenu
    );
    return res.json({ message: "success", categories });
  } else {
    return res.json({ message: "there is no menu with this id" });
  }
};
exports.getCategoryById = async (req, res, next) => {
  const { id } = req.params;
  const category = await categoryService.getCategoryById(id);
  if (category !== null) {
    return res.json({ message: "success", category });
  } else {
    return res.json({ message: "there is no category with this id" });
  }
};
exports.updateCategory = async (req, res, next) => {
  const { body: category } = req;
  const { id } = req.params;
  // if there is a file
  if (req.file) {
    const { file } = req;
    if (file.size > 15000000) {
      return res.json({ message: "file is too large , 15 Mo max" });
    } else {
      category.image = file.filename;
    }
  }
  await categoryService.updateCategory(id, category);
  return res.json({ message: "success" });
};
