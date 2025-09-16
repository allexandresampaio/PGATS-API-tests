const userService = require('../services/userService');
const authService = require('../services/authService');
const transferService = require('../services/transferService');
const jwt = require('jsonwebtoken');
const SECRET = process.env.JWT_SECRET || 'segredo';

const resolvers = {
  Query: {
    users: (parent, args, context) => {
      if (!context.user) throw new Error('Autenticação obrigatória');
      return userService.getAllUsers();
    },
    transfers: (parent, args, context) => {
      if (!context.user) throw new Error('Autenticação obrigatória');
      return transferService.getAllTransfers();
    },
  },
  Mutation: {
    registerUser: (_, { username, password, favorecidos }) => {
      return userService.registerUser({ username, password, favorecidos });
    },
    login: (_, { username, password }) => {
      const user = authService.login({ username, password });
      return jwt.sign({ username: user.username }, SECRET, { expiresIn: '1h' });
    },
    transfer: (parent, { from, to, amount }, context) => {
      if (!context.user) throw new Error('Autenticação obrigatória');
      return transferService.transfer({ from, to, amount });
    },
  },
};

module.exports = resolvers;
