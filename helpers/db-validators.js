const Role = require("../models/role");
const { Usuario, Categoria, Producto } = require("../models");

const esRoleValido = async (role = "") => {
  const existeRol = await Role.findOne({ role });
  if (!existeRol) {
    throw new Error(`The role ${role} is not registered in the BD`);
  }
};

const emailExiste = async (email = "") => {
  // Verificar si el correo existe
  const existeEmail = await Usuario.findOne({ email });
  if (existeEmail) {
    throw new Error(`This email: ${email}, is already registered`);
  }
};

const existeUsuarioPorId = async (id) => {
  // Verificar si el correo existe
  const existeUsuario = await Usuario.findById(id);
  if (!existeUsuario) {
    throw new Error(`the ID does not exist ${id}`);
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
