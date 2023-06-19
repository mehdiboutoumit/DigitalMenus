"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Dish extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Dish.belongsTo(models.User, {
        foreignKey: "id_user",
      });
      Dish.belongsTo(models.Category, {
        foreignKey: "id_category",
      });
      Dish.hasMany(models.Portion, {
        foreignKey: "id_dish",
      });
      Dish.hasMany(models.Extra, {
        foreignKey: "id_dish",
      });
      Dish.hasMany(models.Tag, {
        foreignKey: "id_dish",
      });
      Dish.hasMany(models.IndividualOrder, {
        foreignKey: "id_dish",
      });
    }
  }
  Dish.init(
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
        type: DataTypes.STRING,
        allowNull: true,
        
      },
      description: {
        type: DataTypes.STRING,
        allowNull: true,
        validate: {
          len: [0, 255],
        },
      },
      is_sold_out: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      preparation_time: {
        type: DataTypes.TIME,
        defaultValue: 0,
      },
      calories: {
        type: DataTypes.INTEGER,
        validate: {
          
          isInt: true,
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
      id_category: {
        allowNull: true,
        type: DataTypes.UUID,
        defaultValue: 0
        ,
      },
    },
    {
      sequelize,
      modelName: "Dish",
    }
  );
  return Dish;
};
