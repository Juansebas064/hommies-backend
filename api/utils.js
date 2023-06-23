const apiMessage = "Desgraciado jordi";

const uuidLugar = () => {
    const fechaActual = new Date();
    const mes = fechaActual.getMonth() + 1;
    const dia = fechaActual.getDate();
    const hora = fechaActual.getHours();
    const longitudCodigo = 6;
    let digitosRestantes = '';
    for (let i=0; i < longitudCodigo; i++){
        digitosRestantes += Math.floor(Math.random() * 10)
  }
  
    const identificador = `${mes}${dia}${hora}${digitosRestantes}`;
  
    return identificador;
  }




module.exports = {
    apiMessage: apiMessage,
    uuidLugar: uuidLugar,
}
