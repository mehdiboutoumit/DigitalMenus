const tableService = require("../services/tableService");

exports.createTable = async (req, res, next) => {
  const { body: table } = req;
  const { id, numTable, size, id_menus , id_restaurant } = table;
  const newTable = await tableService.createTable({
    id,
    numTable,
    size,
    id_menus,
    id_restaurant,
  });
  return res.json({ message: "success", table: newTable });
};

exports.getAllTables = async (req, res, next) => {
  const tables = await tableService.getAllTables();
  return res.json({ message: "success", tables });
};
exports.getAllTablesOfRestaurant = async (req, res, next) => {
  if (req.params?.idRestaurant) {
    const tables = await tableService.getAllTablesOfRestaurant(req.params.idRestaurant);
    return res.json({ message: "success", tables });
  } else {
    return res.json({ message: "there is no restaurant with this id" });
  }
};
exports.getTableById = async (req, res, next) => {
  const { id } = req.params;
  const table = await tableService.getTableById(id);
  if (table !== null) {
    return res.json({ message: "success", table });
  } else {
    return res.json({ message: "there is no table with this id" });
  }
};
exports.updateTable = async (req, res, next) => {
  const { body: table } = req;
  const { id } = req.params;
  await tableService.updateTable(id, table);
  return res.json({ message: "success" });
};

exports.deleteTable = async (req,res)=>{
  tableService.deleteTable(req.params.id);
  return res.json({ message: "success" });
}
