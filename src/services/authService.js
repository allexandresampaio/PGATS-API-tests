const bcrypt = require('bcryptjs');
const { users } = require('../models/userModel');

function login({ username, password }) {
  if (!username || !password) {
    throw new Error('Login e senha obrigatórios');
  }
  const user = users.find(u => u.username === username);
  if (!user) {
    throw new Error('Usuário ou senha inválidos');
  }
  const passwordIsValid = bcrypt.compareSync(password, user.password);
  if (!passwordIsValid) {
    throw new Error('Usuário ou senha inválidos');
  }
  return user;
}

module.exports = {
  login,
};
