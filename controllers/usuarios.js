const { response, request } = require("express");
const bcryptjs = require("bcryptjs");

const Usuario = require("../models/usuario");

const usuariosGet = (req = request, res = response) => {
  const { q, nombre = "No name", apikey, page = 1, limit } = req.query;

  res.json({
    msg: "get API - controlador", //Se puede crear o modificar los params del url-Postman
    q,
    nombre,
    apikey,
    page,
    limit,
  });
};

const usuariosPost = async (req, res) => {
  const { name, email, password, role } = req.body;
  const usuario = new Usuario({ name, email, password, role });

  // Verificar si el correo existe
  const existeEmail = await Usuario.findOne({ email });
  if (existeEmail) {
    return res.status(400).json({
      msg: "This email is already registered",
    });
  }

  // Encriptar la contraseña
  const salt = bcryptjs.genSaltSync(); // Por defecto esta en (10)
  usuario.password = bcryptjs.hashSync(password, salt);

  // Guardar en BD
  await usuario.save();

  res.json({
    // msg: "post API - usuariosPost", Usuario creado correctamente desde Postman
    usuario,
  });
};

const usuariosPut = (req, res) => {
  const { id } = req.params;

  res.json({
    msg: "put API - usuariosPut", //Se puede insertar el :id en la url-Postman/id === delete
    id,
  });
};

const usuariosPatch = (req, res) => {
  res.json({
    msg: "patch API - usuariosPatch",
  });
};

const usuariosDelete = (req, res) => {
  res.json({
    msg: "delete API - usuariosDelete",
  });
};

module.exports = {
  usuariosGet,
  usuariosPost,
  usuariosPut,
  usuariosPatch,
  usuariosDelete,
};
