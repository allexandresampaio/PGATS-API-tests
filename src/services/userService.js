const bcrypt = require('bcryptjs');
const { users } = require('../models/userModel');

function registerUser({ username, password, favorecidos }) {
  if (users.find(u => u.username === username)) {
    throw new Error('Usuário já existe');
  }
  let favArr = [];
  if (typeof favorecidos === 'string') {
    favArr = [favorecidos];
  } else if (Array.isArray(favorecidos)) {
    favArr = favorecidos;
  }
  const hashedPassword = bcrypt.hashSync(password, 8);
  const user = { username, password: hashedPassword, favorecidos: favArr, saldo: 10000 };
  users.push(user);
  return user;
}

function getUser(username) {
  return users.find(u => u.username === username);
}

function getAllUsers() {
  return users;
}

module.exports = {
  registerUser,
  getUser,
  getAllUsers,
};
