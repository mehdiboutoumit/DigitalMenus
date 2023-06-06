const { Table } = require("../models");

exports.createTable = async (table) => {
  const { dataValues } = await Table.create(table);
  const newTable = {
    id: dataValues.id,
    numTable: dataValues.numTable,
    size: dataValues.size,
    id_restaurant: dataValues.id_restaurant,
  };
  return newTable;
};

exports.getAllTables = async () => {
  let tables = await Table.findAll();
  if (tables == null) {
    return [];
  }

  tables = tables.map((table) => {
    return {
      id: table.dataValues.id,
      numTable: table.dataValues.numTable,
      size: table.dataValues.size,
      id_restaurant: table.dataValues.id_restaurant,
    };
  });
  return tables;
};
exports.getAllTablesOfRestaurant = async (idRestaurant) => {
  let tables = await Table.findAll({
    where: {
      id_restaurant: idRestaurant,
    },
  });
  if (tables == null) {
    return [];
  }

  tables = tables.map((table) => {
    return {
      id: table.dataValues.id,
      numTable: table.dataValues.numTable,
      size: table.dataValues.size,
      id_restaurant: table.dataValues.id_restaurant,
    };
  });
  return tables;
};
exports.getTableById = async (id) => {
  const data = await Table.findByPk(id);
  if (!data) {
    return null;
  } else {
    return data.dataValues;
  }
};
exports.updateTable = async (id, body) => {
  await Table.update(body, {
    where: {
      id: id,
    },
  });
};
