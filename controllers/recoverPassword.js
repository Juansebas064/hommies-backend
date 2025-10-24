import express from "express";
import { pool, verificarCorreoExistente, encriptarPass } from "../config/db.js";
// import transporter from "../config/nodemailer.js";

function generarTokenRecuperacion() {

  const longitudCodigo = 6;
  let tokenRecuperacion = '';

  for (let i = 0; i < longitudCodigo; i++) {
    tokenRecuperacion += Math.floor(Math.random() * 10)
  }

  return tokenRecuperacion;
}

// const recuperarPass = async (req, res) => {
//   try {
//     const { email } = req.body;

//     const existeCorreo = await verificarCorreoExistente(email);

//     if (existeCorreo) {

//       const codigoVerificacion = generarTokenRecuperacion(email)

//       const mailOptions = {
//         from: '"Contraseña olvidada" <hommiesapp@gmail.com>',
//         to: email,
//         subject: "Recupera tu contraseña en Hommies",
//         html: `
//                   <b> El código de verificación de cuenta es: </b>
//                   <h2> ${codigoVerificacion} </h2>
//                   `,
//       };

//       transporter(mailOptions, (error, info) => {
//         if (error) {
//           console.log(error);
//           res
//             .status(500)
//             .json({ message: "Error al enviar el correo electrónico" });
//         } else {
//           console.log("Correo electrónico enviado: " + info.response);
//           res.status(200).json({
//             message:
//               "Se ha enviado un correo electrónico de recuperación de contraseña",
//           });
//         }
//       });


//       try {

//         const query = "UPDATE public.persona SET token_recuperacion= $1 WHERE correo_electronico= $2;"
//         const values = [codigoVerificacion, email]

//         await pool.query(query, values);
//         return res.status(200).json({ message: "Token guardado correctamente" })
//       } catch (error) {
//         console.log(error)
//         return res.status(404).json({ error: "No se pudo guardar el token" })
//       }

//     } else {
//       res.status(404).json({ message: "Correo electrónico no encontrado" })
//     }
//   } catch (error) {
//     res.status(400).json({ error: "Error al verificar el correo electrónico" });
//   }
// };

const recuperarPassToken = async (req, res) => {
  const { token_recuperacion, correo_electronico } = req.body;

  try {
    // Consulta la base de datos para verificar el token y el correo
    const query = 'SELECT correo_electronico FROM public.persona WHERE token_recuperacion = $1 AND correo_electronico = $2';
    const values = [token_recuperacion, correo_electronico];
    console.log(values)
    const result = await pool.query(query, values);

    if (result.rowCount === 1) {
      // El token y el correo son correctos, redirige al usuario a otra pestaña
      return res.status(200).json({ mensaje: 'Token valido.' })
    } else {
      // El token y el correo no coinciden, muestra un mensaje de error
      return res.status(400).json({ mensaje: 'Token de recuperación inválido' });
    }
  } catch (error) {
    console.error('Error al recuperar la contraseña:', error);
    return res.status(500).json({ mensaje: 'Error al recuperar la contraseña' });
  }
}

const cambiarPass = async (req, res) => {
  const { correo_electronico, contraseña } = req.body;

  try {

    const contraseñaEncriptada = await encriptarPass(contraseña)
    console.log(contraseñaEncriptada)

    const query = 'update public.persona set contraseña = $1 where correo_electronico = $2'
    const values = [contraseñaEncriptada, correo_electronico]
    const result = await pool.query(query, values);

    if (result.rowCount === 1) {
      // El token y el correo son correctos, redirige al usuario a otra pestaña
      return res.status(200).json({ mensaje: 'Contraseña actualizada correctamente.' })
    } else {
      // El token y el correo no coinciden, muestra un mensaje de error
      return res.status(400).json({ mensaje: 'Contraseña no valida' });
    }
  } catch (error) {
    console.error('Error al recuperar la contraseña:', error);
    return res.status(500).json({ mensaje: 'Error al actualizar la contraseña. ' });
  }
}

export {
  // recuperarPass,
  recuperarPassToken,
  cambiarPass
}