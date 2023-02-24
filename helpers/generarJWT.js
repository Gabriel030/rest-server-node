const jwt = require("jsonwebtoken"); 

const generarJWT = (uid = '') => {
    //creo una promesa para poder usar el await cuando llamo la funcion
    return new Promise((resolve, reject) => {

        const payload = {uid}; 
        jwt.sign(payload, process.env.SECRETORPRIVATEKEY, {
            expiresIn: '4h'
        }, (err, token) => {
            if(err) {
                console.log(err)
                reject("no se pudo generar el token")
            }else {
                resolve(token)
            }
        })
    })
}

module.exports = {
    generarJWT,
}