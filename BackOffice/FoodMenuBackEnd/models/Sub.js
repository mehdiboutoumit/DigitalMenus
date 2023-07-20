"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Sub extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {

      Sub.belongsTo(models.Restaurant, {
        foreignKey: "id_restaurant",
      });
      }
    }
  Sub.init(
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
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
          len: [2, 255],
          isEmail: true,
        },
        unique: true,
      },
      points : {
        type: DataTypes.STRING(300),
        defaultValue: "0",
      }
    },
    
    {
      sequelize,
      modelName: "Sub",
    }
  );
  return Sub;
};
