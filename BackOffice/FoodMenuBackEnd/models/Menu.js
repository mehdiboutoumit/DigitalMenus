"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Menu extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Menu.belongsTo(models.User, {
        foreignKey: "id_user",
      });
      Menu.belongsTo(models.Restaurant, {
        foreignKey: "id_restaurant",
      });
      Menu.hasMany(models.Category, {
        foreignKey: "id_menu",
      });
      
    }
  }
  Menu.init(
    {
      id: {
        allowNull: false,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: true,
        validate: {
          notEmpty: true,
          len: [1, 255],
        },
      },
      image: {
        type: DataTypes.BLOB,
        allowNull: true,
        
      },
      description: {
        type: DataTypes.STRING,
        allowNull: true,
        validate: {
          len: [0, 255],
        },
      },
    },
    {
      sequelize,
      modelName: "Menu",
    }
  );
  return Menu;
};
