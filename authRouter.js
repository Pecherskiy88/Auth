const Router = require('express');
const router = new Router();
const { check } = require('express-validator');

const controller = require('./authController');

router.post(
  '/registration',
  [
    check('username', 'name can not be empty').notEmpty(),
    check('password', 'Password min 4 and max 10 symbols').isLength({
      min: 4,
      max: 10,
    }),
  ],
  controller.registration,
);
router.post('/login', controller.login);
router.get('/users', controller.getUsers);

module.exports = router;
