const { users } = require('../models/userModel');

function registerUser({ username, password, favorecido }) {
  if (users.find(u => u.username === username)) {
    throw new Error('Usuário já existe');
  }
  const user = { username, password, favorecido: !!favorecido, saldo: 10000 };
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
