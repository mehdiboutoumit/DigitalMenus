const extraService = require("../services/extraService");

exports.createExtra = async (req, res, next) => {
  const { body: extra } = req;
  const {id, name, price, id_dish } = extra;
  try {
    let existingextra = await extraService.getExtraById(id);
    if (existingextra) {
      await extraService.updateExtra(id,extra);
      return res.json({ message: "success" });
    }
    else{
      const newextra = await extraService.createExtra({
        id,
        name,
        price,
        id_dish,
      });
      return res.json({ message: "success", extra: newextra });
    }

} catch (error) {
  console.error("Error creating/updating extra:", error);
  return res.status(500).json({ message: "Internal server error" });
}
};

exports.getAllExtras = async (req, res, next) => {
  const extras = await extraService.getAllExtras();
  return res.json({ message: "success", extras });
};
exports.getAllExtrasOfDish = async (req, res, next) => {
  if (req.params?.idDish) {
    const extras = await extraService.getAllExtrasOfDish(
      req.params.idDish
    );
    return res.json({ message: "success", extras });
  } else {
    return res.json({ message: "there is no dish with this id" });
  }
};
exports.getExtraById = async (req, res, next) => {
  const { id } = req.params;
  const extra = await extraService.getExtraById(id);
  if (extra !== null) {
    return res.json({ message: "success", extra });
  } else {
    return res.json({ message: "there is no extra with this id" });
  }
};
exports.updateExtra = async (req, res, next) => {
  const { body: extra } = req;
  const { id } = req.params;
  await extraService.updateExtra(id, extra);
  return res.json({ message: "success" });
};

exports.deleteExtra = async (req,res)=>{
  extraService.deleteExtra(req.params.id);
  return res.json({ message: "success" });
}