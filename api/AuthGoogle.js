import { OAuth2Client } from 'google-auth-library';
const idcliente = '650698705793-eetbgpi48lld1tb4eol6n8g355raapeg.apps.googleusercontent.com';
const clientID = new OAuth2Client(idcliente);

//funcion pra decodificar el token, funcion de prueba ya que no verifica que sea un token valido
function decodeJwt(token) {
    const parts = token.split(".");
    if (parts.length !== 3) {
      throw new Error("Invalid token format");
    }
    const header = JSON.parse(atob(parts[0]));
    const payload = JSON.parse(atob(parts[1]));
    return { header, payload };
  }

//funcion de verificar el token, esta devuelve el token decodificado y verificado 
async function verifyGoogleCredential(token) {
  try {
    const ticket = await clientID.verifyIdToken({
      idToken: token,
      audience: idcliente,
    });

    const payload = ticket.getPayload();
    const userId = payload.sub;

    // Puedes realizar validaciones adicionales o guardar la información del usuario en la base de datos
    return {
      id: userId,
      email: payload.email,
      nickname: payload.name,
      firstName: payload.given_name,
      lastName: payload.family_name,
      picture: payload.picture
    };
  } catch (error) {
    console.error("Error verifying Google credential:", error);
    throw error;
  }
}

export  
    {decodeJwt, verifyGoogleCredential};