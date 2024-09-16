const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Registro de usuario
exports.register = async (req, res) => {
    const { username, email, password } = req.body;

  // Verificar si el usuario ya existe
    const userExists = await User.findOne({ email });
    if (userExists) return res.status(400).send('El correo ya está registrado.');

  // Hash de la contraseña
    const hashedPassword = await bcrypt.hash(password, 10);

  // Crear nuevo usuario
    const user = new User({
    username,
    email,
    password: hashedPassword
});

try {
    const savedUser = await user.save();
    res.status(201).send({ message: 'Usuario registrado', user: savedUser });
    } catch (err) {
    res.status(400).send(err);
    }
};

// Inicio de sesión
exports.login = async (req, res) => {
    const { username, password } = req.body;

  // Verificar si el usuario existe
    const user = await User.findOne({ username });
    if (!user) return res.status(400).send('Usuario o contraseña incorrectos.');

  // Verificar la contraseña
    const validPass = await bcrypt.compare(password, user.password);
    if (!validPass) return res.status(400).send('Usuario o contraseña incorrectos.');

  // Crear y asignar un token
    const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET);
    res.header('Authorization', token).send({ message: 'Inicio de sesión exitoso', token });
};

// Recurso protegido
exports.protectedResource = (req, res) => {
    res.send({ message: 'Acceso al recurso protegido', user: req.user });
};

// Cerrar sesión
exports.logout = (req, res) => {
    res.send({ message: 'Sesión cerrada exitosamente' });
};
