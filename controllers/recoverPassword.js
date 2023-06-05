const tomarCorreo = async (req, res) => {
    try{
        const {email} = req.body;

        res.status(200).json({mensaje: "Correo captado exitosamente"})
    }catch(error){
        console.error("Error al captar correo", error);
        res.status(500).json({mensaje: "El correo no ha sido captado"})
    }
};

module.exports = tomarCorreo;