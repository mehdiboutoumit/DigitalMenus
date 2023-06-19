"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Restaurant extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Restaurant.hasMany(models.Menu, {
        foreignKey: "id_restaurant",
      });
      Restaurant.hasMany(models.Table, {
        foreignKey: "id_restaurant",
      });
      Restaurant.hasMany(models.User, {
        foreignKey: "id_restaurant",
      });
      Restaurant.belongsTo(models.Admin, {
        foreignKey: "id_admin",
      });
      Restaurant.hasMany(models.GlobalOrder, {
        foreignKey: "id_restaurant",
      });
    }
  }
  Restaurant.init(
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
      image: {
        type: DataTypes.STRING,
        allowNull: true,
       
      },
      address: {
        type: DataTypes.STRING,
        allowNull: true,
        validate: {
          len: [1, 255],
        },
      },
      description: {
        type: DataTypes.STRING,
        allowNull: true,
        validate: {
          len: [1, 255],
        },
      },
    },
    {
      sequelize,
      modelName: "Restaurant",
    }
  );
  return Restaurant;
};
