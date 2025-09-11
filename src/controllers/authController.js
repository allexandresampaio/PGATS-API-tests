const authService = require('../services/authService');
const jwt = require('jsonwebtoken');
const SECRET = process.env.JWT_SECRET || 'segredo';

exports.login = (req, res) => {
  try {
    const user = authService.login(req.body);
    const token = jwt.sign({ username: user.username }, SECRET, { expiresIn: '1h' });
    res.json({ message: 'Login realizado com sucesso', token, user });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
