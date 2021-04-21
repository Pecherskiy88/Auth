const User = require('./models/User');
const Role = require('./models/Role');
const bcrypt = require('bcrypt');

const { validationResult } = require('express-validator');

class authController {
  async registration(req, res) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ message: 'Registration error', errors });
      }

      const { username, password } = req.body;
      const candidate = await User.findOne({ username });

      if (candidate) {
        return res.status(400).json({ message: 'User with this name exists' });
      }

      const saltRounds = 10;

      bcrypt.hash(password, saltRounds, async function (err, hash) {
        // Store hash in your password DB.
        if (err) {
          throw err;
        }
        const userRole = await Role.findOne({ value: 'USER' });
        const user = new User({
          username,
          password: hash,
          roles: [userRole.value],
        });
        await user.save();
        return res.json({ message: 'User created' });
      });
    } catch (e) {
      console.log(e);
      res.status(400).json({ message: 'Registration error' });
    }
  }
  async login(req, res) {
    try {
    } catch (e) {
      console.log(e);
      res.status(400).json({ message: 'Login error' });
    }
  }
  async getUsers(req, res) {
    try {
      res.json('server is work!');
    } catch (e) {
      console.log(e);
    }
  }
}

module.exports = new authController();
