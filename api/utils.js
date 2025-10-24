const apiMessage = "Mensaje de prueba";

const uuidLugar = () => {
  const longitudCodigo = 6;
  let digitosRestantes = '';
  for (let i = 0; i < longitudCodigo; i++) {
    digitosRestantes += Math.floor(Math.random() * 10)
  }

  const identificador = `${digitosRestantes}`;

  return identificador;
}


export { apiMessage, uuidLugar }
