const { response } = require("express");

const esAdminRol = (req, res = response, next) => {
    //verifico que viene un usuario distinto a undefined
    if(!req.usuario){
        return res.status(500).json({
            msg: "Se quiere verificar el role sin validar el token"
        })
    }

    const {rol, nombre} = req.usuario

    if(rol !== "ADMIN_ROLE"){
        return res.status(401).json({
            msg: `${nombre} no es administrador - No tiene acceso`
        })
    }

    next()
}


//esta funcion recibe los roles como parametro
const tieneRole = (...roles) => {
    
    //ejecuta una funcion q recibe los parametros de un Middleware
    return (req, res = response, next) => {
        
        //verifico que viene un usuario distinto a undefined
        if(!req.usuario){
            return res.status(500).json({
                msg: "Se quiere verificar el role sin validar el token"
            })
        }
        if(!roles.includes(req.usuario.rol)){
            return res.status(401).json({
                msg: `EL servicio rrequiere uno de estos roles: ${roles}`
            })
        }

        next()
    }


}

module.exports = {
    esAdminRol,
    tieneRole,
}