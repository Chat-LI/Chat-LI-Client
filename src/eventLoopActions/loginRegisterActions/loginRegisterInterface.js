const login = require('./login');
const getUserAction = require('./getUserAction');
const register = require('./register');

loginRegisterInterface = {
  login,
  getUserAction,
  register,
};

module.exports = loginRegisterInterface;
