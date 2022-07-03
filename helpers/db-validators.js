const Role = require("../models/role");
const { Usuario, Categoria } = require("../models");

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
  // Verificar si 
  const existeCategoria = await Categoria.findById(id);
  if (!existeCategoria) {
    throw new Error(`El id no existe ${id}`);
  }
};


module.exports = {
  esRoleValido,
  emailExiste,
  existeUsuarioPorId,
  existeCategoriaPorId
};
