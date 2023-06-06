"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Admin extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Admin.hasMany(models.User, {
        foreignKey: "id_admin",
      });
      Admin.hasMany(models.Restaurant, {
        foreignKey: "id_admin",
      });
      Admin.belongsTo(models.SuperAdmin, {
        foreignKey: "id_super_admin",
      });
    }
  }
  Admin.init(
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
      modelName: "Admin",
    }
  );
  return Admin;
};
