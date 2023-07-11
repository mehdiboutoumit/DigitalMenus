"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
     
      User.belongsTo(models.Role, {
        foreignKey: "id_role",
      });
      User.belongsTo(models.Restaurant, {
        foreignKey: "id_restaurant",
      });
      User.hasMany(models.Menu, {
        foreignKey: "id_user",
      });
      User.hasMany(models.Category, {
        foreignKey: "id_user",
      });
      User.hasMany(models.Dish, {
        foreignKey: "id_user",
      });
      User.hasMany(models.Portion, {
        foreignKey: "id_user",
      });
      User.hasMany(models.Extra, {
        foreignKey: "id_user",
      });
      User.hasMany(models.Tag, {
        foreignKey: "id_user",
      });
      User.hasMany(models.Table, {
        foreignKey: "id_user",
      });
    }
  }
  User.init(
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
          len: [2, 255],
        },
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
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
          len: [6, 255],
        },
      },

      refresh_token: {
        type: DataTypes.STRING(300),
        defaultValue: null,
      },
    },
    {
      sequelize,
      modelName: "User",
    }
  );
  return User;
};
