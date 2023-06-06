"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Table extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Table.belongsTo(models.Restaurant, {
        foreignKey: "id_restaurant",
      });
      Table.belongsTo(models.User, {
        foreignKey: "id_user",
      });
      Table.hasMany(models.GlobalOrder, {
        foreignKey: "id_table",
      });
    }
  }
  Table.init(
    {
      id: {
        allowNull: false,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      numTable: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notEmpty: true,
          isInt: true,
        },
        unique: true,
      },
      size: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notEmpty: true,
          isInt: true,
        },
      },
    },
    {
      sequelize,
      modelName: "Table",
    }
  );
  return Table;
};
