"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Category extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Category.belongsTo(models.User, {
        foreignKey: "id_user",
      });
      Category.belongsTo(models.Menu, {
        foreignKey: "id_menu",
      });
      Category.hasMany(models.Dish, {
        foreignKey: "id_category",
      });
    }
  }
  Category.init(
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
          len: [0, 255],
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
      modelName: "Category",
    }
  );
  return Category;
};
