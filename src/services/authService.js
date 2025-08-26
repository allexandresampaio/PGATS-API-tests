const { users } = require('../models/userModel');

function login({ username, password }) {
  if (!username || !password) {
    throw new Error('Login e senha obrigatórios');
  }
  const user = users.find(u => u.username === username && u.password === password);
  if (!user) {
    throw new Error('Usuário ou senha inválidos');
  }
  return user;
}

module.exports = {
  login,
};
