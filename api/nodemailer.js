const nodemailer = require('nodemailer')

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth:{
        user: "hommiesapp@gmail.com",
        pass: "ytpiikatpdzxbjqs"
    }
})

transporter.verify()
    .then(()=>{
        console.log('Verificacion SMTP lista')
    }).catch((error)=>{
        console.log(error)
    });



module.exports = transporter;