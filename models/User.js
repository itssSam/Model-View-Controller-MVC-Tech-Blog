// models/user.js
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection'); // Adjust the path as necessary
const bcrypt = require('bcrypt');

class User extends Model {
  // Method to check password on login
  checkPassword(loginPw) {
    return bcrypt.compareSync(loginPw, this.password);
  }
}

User.init({
  // Model attributes are defined here
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      len: [8] // Passwords should be at least 8 characters long
    }
  }
}, {
  sequelize,
  timestamps: true,
  freezeTableName: true,
  underscored: true,
  modelName: 'user',
  hooks: {
    // Before creating a new user, hash the password
    beforeCreate: async (newUserData) => {
      newUserData.password = await bcrypt.hash(newUserData.password, 10);
      return newUserData;
    },
    // Before updating user data, hash the password
    beforeUpdate: async (updatedUserData) => {
      updatedUserData.password = await bcrypt.hash(updatedUserData.password, 10);
      return updatedUserData;
    }
  }
});

module.exports = User;
