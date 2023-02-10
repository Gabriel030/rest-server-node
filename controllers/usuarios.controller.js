const {response, request} = require("express")

const usuariosGet = (req = request,res = response ) => {
    
    //*si la url tengo PARAMETROS OPCIONALES
    //http://localhost:8080/api/usuarios?q=hola&page=10&limit=10
    //los puedo obtener desde el req.query
    //*si la url tiene PARAMETROS OBLIGATORIOS
    //http://localhost:8080/api/usuarios/10
    //los obtengo desde el req.params
    const {q = "sinNombre", page = 1, limit = 10} = req.query
    res.json({
        'msg': "get api - controlador",
        q,
        page,
        limit
    })
}

const usuariosPut = (req,res= response ) => {
    
    const id = req.params.id
    res.json({
        'msg': "put api - controlador",
        id

    })
}

const usuariosPost = (req,res = response) => {
    const {nombre, edad} = req.body
    res.status(201).json({
        'msg': "post api - controlador",
        nombre,
        edad,
    })
}

const usuariosDelete = (req,res = response) => {
    res.json({
        'msg': "delete api - controlador"
    })
}



module.exports = {
    usuariosGet,
    usuariosPut,
    usuariosPost,
    usuariosDelete
}

