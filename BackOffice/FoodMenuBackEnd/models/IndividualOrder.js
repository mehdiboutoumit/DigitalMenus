"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class IndividualOrder extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // remove table
      // IndividualOrder.belongsTo(models.GlobalOrder, {
      //   foreignKey: "id_global_order",
      // });
      IndividualOrder.belongsTo(models.Dish, {
        foreignKey: "id_dish",
      });
      IndividualOrder.belongsTo(models.Portion, {
        foreignKey: "id_portion",
      });
      IndividualOrder.belongsTo(models.GlobalOrder, {
        foreignKey: "id_global_order",
      });

    }
  }
  IndividualOrder.init(
    {
      id: {
        allowNull: false,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      price: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
        validate: {
          notEmpty: true,
          isDecimal: true,
        },
      },
      note: {
        type: DataTypes.STRING,
        allowNull: true,
        validate: {
          len: [2, 255],
        },
      },
    },
    {
      sequelize,
      modelName: "IndividualOrder",
    }
  );
  return IndividualOrder;
};
