"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class ExtraOrder extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      models.IndividualOrder.belongsToMany(models.Extra, {
        through: ExtraOrder,
      });
      models.Extra.belongsToMany(models.IndividualOrder, {
        through: ExtraOrder,
      });
    }
  }
  ExtraOrder.init(
    {
      id: {
        allowNull: false,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      IndividualOrderId: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        references: {
          model: "IndividualOrder",
          key: "id",
        },
      },
      ExtraId: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        references: {
          model: "Extra",
          key: "id",
        },
      },
    },
    {
      sequelize,
      modelName: "ExtraOrder",
    }
  );
  return ExtraOrder;
};
