const { response } = require("express");
const jwt = require("jsonwebtoken");
const Usuario = require("../models/usuarios");

const validarJWT = async (req, res = response, next) => {
    //tomo el token del header
    const token = req.header('x-token')
    //valido que tenga token, sino tiene rechazo
    if(!token){
        return res.status(401).json({
            msg:"no hay token en la peticion"
        })
    }
    
    try {
        //si tiene token valido que sea correcto
        const {uid} = jwt.verify(token, process.env.SECRETORPRIVATEKEY);
        //leer el usuario que corresponde al uid
        const usuario = await Usuario.findById(uid)        
        
        //si el usuario no existe
        if(!usuario) {
            return res.status(401).jso({
                msg:"usuario no existe en BD"
            })
        }
        //verificar si el uid tiene estado true
        if(!usuario.estado){
            return res.status(401).json({
                msg:"Usuario con estado en false"
            })
        }

        
        
        
        req.usuario = usuario
        next()
        
    } catch (error) {
        console.log(error)
        res.status(401).json({
            msg:"Token no valido"
        })
    }
    


}

module.exports = {
    validarJWT
}