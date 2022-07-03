const { response, request } = require("express");
const bcryptjs = require("bcryptjs");

const Usuario = require("../models/usuario");

const usuariosGet = async (req = request, res = response) => {
  // const { q, nombre = "No name", apikey, page = 1, limit } = req.query;  // Referencia
  const { desde = 0, limite = 5 } = req.query;
  const query = { state: true };

  const [total, usuarios] = await Promise.all([
    Usuario.countDocuments(query),
    Usuario.find(query).skip(Number(desde)).limit(Number(limite)),
  ]);

  res.json({
    total,
    usuarios,
  });
  // msg: "get API - controlador", Se puede modificar los params para la paginación y otros
  // q,
  // nombre,
  // apikey,
  // page,
  // limit,
};

const usuariosPost = async (req, res) => {
  const { name, email, password, role } = req.body;
  const usuario = new Usuario({ name, email, password, role });

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

const usuariosPut = async (req, res) => {
  const { id } = req.params;
  const { _id, password, google, email, ...resto } = req.body; // Solo se esta tomando el ...resto lo demás no se esta incluyendo

  if (password) {
    // Desencriptar la contraseña para actualizar
    const salt = bcryptjs.genSaltSync(); // Por defecto esta en (10)
    resto.password = bcryptjs.hashSync(password, salt);
  }

  const usuario = await Usuario.findByIdAndUpdate(id, resto, {
    returnOriginal: false,
  });

  res.json(usuario);
  // msg: "put API - usuariosPut", Se puede insertar el :id en la url-Postman/id === delete
};

const usuariosDelete = async (req, res = response) => {
  const { id } = req.params;

  const usuario = await Usuario.findByIdAndUpdate(
    id,
    { state: false },
    { returnOriginal: false }
  );

  res.json(usuario);
  // msg: "delete API - usuariosDelete",
};

const usuariosPatch = (req, res = response) => {
  res.json({
    msg: "patch API - usuariosPatch",
  });
};

module.exports = {
  usuariosGet,
  usuariosPost,
  usuariosPut,
  usuariosPatch,
  usuariosDelete,
};
