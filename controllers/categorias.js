const { response } = require("express");
const { Categoria } = require('../models');

// obtenerCategorias - paginado - total - populate
const obtenerCategorias = async (req, res = response) => {
  const { desde = 0, limite = 5 } = req.query;
  const query = { state: true };

  const [total, categorias] = await Promise.all([
    Categoria.countDocuments(query),
    Categoria.find(query)
      .populate('usuario', 'name')
      .skip(Number(desde))
      .limit(Number(limite)),
  ]);

  res.json({
    total,
    categorias,
  });
}

// obtenerCategoria - populate {}
const obtenerCategoria = async (req, res = response) => {

  const { id } = req.params;
  const categoria = await Categoria.findById(id).populate('usuario', 'name');

  res.json(categoria)

}


const crearCategoria = async (req, res = response) => {
  console.log(Categoria);
  const nombre = req.body.nombre.toUpperCase();

  const categoriaDB = await Categoria.findOne({ nombre });

  if (categoriaDB) {
    return res.status(400).json({
      msg: `La categoria ${categoriaDB.nombre}, ya existe`
    });
  }

  // Generar la data a guardar
  const data = {
    nombre: nombre,
    usuario: req.usuario._id,
  }

  const categoria = new Categoria(data);

  // Guardar DB
  await categoria.save();

  res.status(201).json(categoria);
}

// actualizarCategoria

// borrarCategoria - estado:false


module.exports = {
  crearCategoria,
  obtenerCategorias,
  obtenerCategoria
}