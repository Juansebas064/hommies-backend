const express = require("express");
const { pool, verificarCorreoExistente } = require("../api/db.js");
const transporter = require("../api/nodemailer.js");

function generarTokenRecuperacion() {
  const longitudCodigo = 6;
  let tokenRecuperacion = '';
  for (let i=0; i < longitudCodigo; i++){
    tokenRecuperacion += Math.floor(Math.random() * 10)
  }

  return tokenRecuperacion;
}

const recuperarPass = async (req, res) => {
  try {
    const { email } = req.body;

    const existeCorreo = await verificarCorreoExistente(email);

    if (existeCorreo) {

      const codigoVerificacion = generarTokenRecuperacion(email)
        
      const mailOptions = {
        from: '"Contraseña olvidada" <hommiesapp@gmail.com>',
        to: email,
        subject: "Recupera tu contraseña en Hommies",
        html: `
                  <b> El código de verificación de cuenta es: </b>
                  <h2> ${codigoVerificacion} </h2>
                  `,
      };

      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.log(error);
          res
            .status(500)
            .json({ message: "Error al enviar el correo electrónico" });
        } else {
          console.log("Correo electrónico enviado: " + info.response);
          res.status(200).json({
            message:
              "Se ha enviado un correo electrónico de recuperación de contraseña",
          });
        }
      });


      try {
        
        const query = "UPDATE public.persona SET token_recuperacion= $1 WHERE correo_electronico= $2;"
        const values = [codigoVerificacion, email]

        await pool.query(query, values);
        return res.status(200).json({message: "Token guardado correctamente"})
      } catch (error) {
        console.log(error)
        return res.status(404).json({error: "No se pudo guardar el token"})
      }



    } else {
        res.status(404).json({message: "Correo electrónico no encontrado"})
    }
  } catch (error) {
    res.status(400).json({ error: "Error al verificar el correo electrónico" });
  }
};

module.exports = recuperarPass;
