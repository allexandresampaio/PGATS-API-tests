const bcrypt = require('bcryptjs');

// In-memory user database
const users = [
  {
    username: 'alle',
    password: bcrypt.hashSync('123456', 8),
    favorecidos: [ 'desa' ],
    saldo: 10000
  },
  {
    username: 'desa',
    password: bcrypt.hashSync('123456', 8),
    favorecidos: [ 'alle' ],
    saldo: 10000
  }
];

module.exports = {
  users
};
