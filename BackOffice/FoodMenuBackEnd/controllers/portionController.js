const portionService = require("../services/portionService");

exports.createPortion = async (req, res, next) => {
  const { body: portion } = req;
  const { name, price, calories, id_dish } = portion;
  const newPortion = await portionService.createPortion({
    name,
    price,
    calories,
    id_dish,
  });
  return res.json({ message: "success", portion: newPortion });
};

exports.getAllPortions = async (req, res, next) => {
  let portions = await portionService.getAllPortions();
  return res.json({ message: "success", portions });
};
exports.getAllPortionsOfDish = async (req, res, next) => {
  if (req.params?.idDish) {
    const portions = await portionService.getAllPortionsOfDish(
      req.params.idDish
    );
    return res.json({ message: "success", portions });
  } else {
    return res.json({ message: "there is no dish with this id" });
  }
};
exports.getPortionById = async (req, res, next) => {
  const { id } = req.params;
  const portion = await portionService.getPortionById(id);
  if (portion !== null) {
    return res.json({ message: "success", portion });
  } else {
    return res.json({ message: "there is no portion with this id" });
  }
};
exports.updatePortion = async (req, res, next) => {
  const { body: portion } = req;
  const { id } = req.params;
  await portionService.updatePortion(id, portion);
  return res.json({ message: "success" });
};
