"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class GlobalOrder extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // remove table
      // GlobalOrder.belongsTo(models.GlobalOrder, {
      //   foreignKey: "id_global_order",
      // });
      GlobalOrder.belongsTo(models.Table, {
        foreignKey: "id_table",
      });
      GlobalOrder.belongsTo(models.Restaurant, {
        foreignKey: "id_restaurant",
      });
      GlobalOrder.hasMany(models.IndividualOrder, {
        foreignKey: "id_global_order",
      });

    }
  }
  GlobalOrder.init(
    {
      id: {
        allowNull: false,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      
    },
    {
      sequelize,
      modelName: "GlobalOrder",
    }
  );
  return GlobalOrder;
};
