const router = require('express').Router();
const authController = require('../controllers/authController');
const auth = require('../middleware/auth');

// Rutas de autenticación
router.post('/register', authController.register);
router.post('/login', authController.login);
router.get('/protected-resource', auth, authController.protectedResource);
router.post('/logout', auth, authController.logout);

module.exports = router;
