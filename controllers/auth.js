const { response } = require("express");
const bcryptjs = require("bcryptjs");

const Usuario = require("../models/usuario");

const { generarJWT } = require("../helpers/generar-jwt");
const { googleVerify } = require("../helpers/google-verify");

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Verificar si el email existe
    const usuario = await Usuario.findOne({ email });
    if (!usuario) {
      return res.status(400).json({
        msg: "Usuario / Password no son correctos - email",
      });
    }

    // Si el usuario está activo
    if (!usuario.state) {
      return res.status(400).json({
        msg: "Usuario / Password no son correctos - state: false",
      });
    }

    // Verificar la contraseña
    const validPassword = bcryptjs.compareSync(password, usuario.password);
    if (!validPassword) {
      return res.status(400).json({
        msg: "Usuario / Password no son correctos - password",
      });
    }

    // Generar el JWT
    const token = await generarJWT(usuario.id);

    res.json({
      usuario,
      token,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      msg: "Hable con el administrador",
    });
  }
};

const googleSignIn = async (req, res = response) => {
  const { id_token } = req.body;

  try {
    const { nombre, img, correo } = await googleVerify(id_token);
    // console.log(googleUser);
    let usuario = await Usuario.findOne({ correo });

    // Tengo que crearlo
    if (!usuario) {
      const data = {
        nombre,
        correo,
        password: ":P",
        img,
        role: "ADMIN_ROLE",
        google: true,
      };

      usuario = new Usuario(data);
      await usuario.save();
    }

    // Si el usuario en DB
    if (!usuario.state) {
      return res.status(401).json({
        msg: "hable con el administrador, usuario bloqueado",
      });
    }

    // Generar el JWT
    const token = await generarJWT(usuario.id);

    res.json({
      usuario,
      token,
    });
  } catch (error) {
    // ok: false,
    console.log(error);
    res.status(400).json({
      msg: "El Token de Google no es válido",
      // id_token,
    });
  }
};

module.exports = {
  login,
  googleSignIn,
};
