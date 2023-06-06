const extraService = require("../services/extraService");

exports.createExtra = async (req, res, next) => {
  const { body: extra } = req;
  const { name, price, id_dish } = extra;
  const newExtra = await extraService.createExtra({
    name,
    price,
    id_dish,
  });
  return res.json({ message: "success", extra: newExtra });
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
