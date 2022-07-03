const { Router } = require("express");
const { check } = require("express-validator");

const { validarJWT, validarCampos } = require("../middlewares");

const { crearCategoria, obtenerCategorias, obtenerCategoria } = require("../controllers/categorias");
const { existeCategoriaPorId } = require("../helpers/db-validators");

const router = Router();

// {{url}}/api/categorias

// Obtener todas las categorias - publico
router.get('/', obtenerCategorias)

// Obtener una categoria por id - publico
router.get('/:id', [
  check('id', 'No es un id de Mongo válido').isMongoId(),
  check('id').custom(existeCategoriaPorId),
  validarCampos,
], obtenerCategoria)

// Crear categoria - privado - cualquier persona con un token válido
router.post('/', [
  validarJWT,
  check('nombre', 'El nombre es obligatorio').not().isEmpty(),
  validarCampos,
], crearCategoria);

// Actualizar - privado - cualquier con token válido
router.put('/:id', (req, res) => {
  res.json('put');
})

// Borrar una categoria - Admin
router.delete('/:id', (req, res) => {
  res.json('delete');
})

module.exports = router;

