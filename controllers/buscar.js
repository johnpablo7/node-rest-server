const { response } = require("express");
const { ObjectId } = require('mongoose').Types;

const { Usuario, Categoria, Producto } = require('../models');

const coleccionesPermitidas = [
  'usuarios',
  'categorias',
  'productos',
  'roles'
];

const buscarUsuarios = async (termino = "", res = response) => {

  const esMongoID = ObjectId.isValid(termino); // TRUE

  if (esMongoID) {
    const usuario = await Usuario.findById(termino);
    return res.json({
      results: (usuario) ? [usuario] : []
    });
  }



}


const buscar = async (req, res = response) => {

  const { coleccion, termino } = req.params;

  if (!coleccionesPermitidas.includes(coleccion)) {
    return res.status(400).json({
      msg: `Las colecciones permitidas son: ${coleccionesPermitidas}`
    })
  }

  switch (coleccion) {
    case 'usuarios':
      buscarUsuarios(termino, res);
      break;

    case 'categorias':

      break;

    case 'productos':

      break;

    default:
      res.status(500).json({
        msg: 'Se le olvido hacer esta búsqueda'
      })

  }

}



module.exports = {
  buscar,

}