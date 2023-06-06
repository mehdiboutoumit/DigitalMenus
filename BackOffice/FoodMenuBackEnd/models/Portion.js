"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Portion extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Portion.belongsTo(models.User, {
        foreignKey: "id_user",
      });
      Portion.belongsTo(models.Dish, {
        foreignKey: "id_dish",
      });
      Portion.hasMany(models.IndividualOrder, {
        foreignKey: "id_portion",
      });
    }
  }
  Portion.init(
    {
      id: {
        allowNull: false,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
          len: [1, 255],
        },
      },
      price: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
        validate: {
          notEmpty: true,
          isDecimal: true,
        },
      },
      calories: {
        type: DataTypes.INTEGER,
        validate: {
          notEmpty: true,
          isInt: true,
        },
      },
    },
    {
      sequelize,
      modelName: "Portion",
    }
  );
  return Portion;
};
