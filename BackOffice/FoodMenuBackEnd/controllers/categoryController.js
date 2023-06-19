const categoryService = require("../services/categoryService");

exports.createCategory = async (req, res, next) => {
  const {
    body: category,
   file,
    // user: connectedUser
  } = req;
  console.log(file);
  
 

  const { id, name, description, id_menu, image } = category;

  try {
    let existingCategory = await categoryService.getCategoryById(id);

    if (existingCategory) {
      if (file) {
        if (file.size > 15000000) {
          return res.json({ message: "file is too large, 15 Mo max" });
        }
        existingCategory.image = file.filename;}
      // Category already exists, update it instead of creating a new one
      if (name) existingCategory.name = name;
  if (image) existingCategory.image = image;
  if (description) existingCategory.description = description;

      existingCategory = await categoryService.updateCategory(id, existingCategory);

      return res.json({ message: "Category updated successfully", category: existingCategory });
    }
    if (file) {
      if (file.size > 15000000) {
        return res.json({ message: "file is too large, 15 Mo max" });
      }
      category.image = file.filename;
    } else {
      category.image = "no name";
    }
  
    
    const newCategory = await categoryService.createCategory(category);

    return res.json({ message: "Category created successfully", category: newCategory });
  } catch (error) {
    console.error("Error creating/updating category:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
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

    const updatedCategories = categories.map((category) => {
      return category;
    });

    return res.json({ message: "success", categories: updatedCategories });
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

exports.deleteCategoryAndDishes = async (req, res, next) => {
  const { id } = req.params;

  try {
    await categoryService.deleteCategoryAndDishes(id);
    return res.json({ message: "Category and its dishes deleted successfully" });
  } catch (error) {
    console.error("Error deleting category and its dishes:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};