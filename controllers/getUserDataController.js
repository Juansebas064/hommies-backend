const persona = require('../models/persona.js');

const getUserData = async (req, res) => {
  const { id } = req.body;
  console.log(id);

  try {

    const userData = await persona.findByPk(id);

    if (!userData) {
      return res.status(404).json({ error: 'El usuario no esta registrado' });
    }

    // El inicio de sesión fue exitoso
    res.status(200).json(userData);

  } catch (error) {

    console.error('Error al realizar el inicio de sesión:', error);
    res.status(500).json({ error: 'Error del servidor' });
  }
};

module.exports = getUserData;