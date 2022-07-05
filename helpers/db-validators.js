const Role = require("../models/role");
const { Usuario, Categoria, Producto } = require("../models");

const esRoleValido = async (rol = "") => {
  const existeRol = await Role.findOne({ rol });
  if (!existeRol) {
    throw new Error(`El rol ${rol} no está registrado en la BD`);
  }
};

const emailExiste = async (correo = "") => {
  // Verificar si el correo existe
  const existeEmail = await Usuario.findOne({ correo });
  if (existeEmail) {
    throw new Error(`El correo: ${correo}, ya está registrado`);
  }
};

const existeUsuarioPorId = async (id) => {
  // Verificar si el correo existe
  const existeUsuario = await Usuario.findById(id);
  if (!existeUsuario) {
    throw new Error(`El id no existe ${id}`);
  }
};

// Validadores de Categorias
const existeCategoriaPorId = async (id) => {
  // Verificar si el correo  existe
  const existeCategoria = await Categoria.findById(id);
  if (!existeCategoria) {
    throw new Error(`El id no existe ${id}`);
  }
};

// Validadores de Productos
const existeProductoPorId = async (id) => {
  // Verificar si el correo  existe
  const existeProducto = await Producto.findById(id);
  if (!existeProducto) {
    throw new Error(`El id no existe ${id}`);
  }
};

const categoriaExisteActualizar = async (nombre = "", id) => {
  nombre = nombre.toUpperCase();

  const nombreActual = await Categoria.findOne({ id });

  if (nombreActual.nombre !== nombre) {
    const existeCategoria = await Categoria.findOne({ nombre });
    if (existeCategoria) {
      throw new Error(`La categoria ${nombre} ya existe`);
    }
  }
};


module.exports = {
  esRoleValido,
  emailExiste,
  existeUsuarioPorId,
  existeCategoriaPorId,
  categoriaExisteActualizar,
  existeProductoPorId
};
