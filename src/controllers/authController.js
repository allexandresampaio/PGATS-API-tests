const authService = require('../services/authService');

exports.login = (req, res) => {
  try {
    const user = authService.login(req.body);
    res.json({ message: 'Login realizado com sucesso', user });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
