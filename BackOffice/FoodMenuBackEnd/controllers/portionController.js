const portionService = require("../services/portionService");

exports.createPortion = async (req, res, next) => {
  const { body: portion } = req;
  const {id, name, price, calories, id_dish } = portion;
  console.log(req);
  try {
    let existingPortion = await portionService.getPortionById(id);
    if (existingPortion) {
      await portionService.updatePortion(id,portion);
      return res.json({ message: "success" });
    }
    else{
      const newPortion = await portionService.createPortion({
        id,
        name,
        price,
        calories,
        id_dish,
      });
      return res.json({ message: "success", portion: newPortion });
    }

} catch (error) {
  console.error("Error creating/updating portion:", error);
  return res.status(500).json({ message: "Internal server error" });
}
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

exports.deletePortion = async (req,res)=>{
  portionService.deletePortion(req.params.id);
  return res.json({ message: "success" });
}