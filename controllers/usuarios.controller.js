const {response, request} = require("express")
const bcryptjs = require("bcryptjs")
const Usuario = require("../models/usuarios")


const usuariosGet = async (req = request,res = response ) => {
    
    //*si la url tengo PARAMETROS OPCIONALES
    //http://localhost:8080/api/usuarios?q=hola&page=10&limit=10
    //los puedo obtener desde el req.query
    //*si la url tiene PARAMETROS OBLIGATORIOS
    //http://localhost:8080/api/usuarios/10
    //los obtengo desde el req.params
    //const {q = "sinNombre", page = 1, limit = 10} = req.query
    const {limite = 5, desde = 0} = req.query

   //emitir 2 solicitudes asincronas de manera concurrente
    const [usuarios, total] = await Promise.all([
        Usuario.find({estado:true}),
        Usuario.count({estado:true})
                .skip(Number(desde))
                .limit(Number(limite))
    ])


    res.json({
        usuarios,
        total
    })
}

const usuariosPut = async (req,res= response ) => {
    
    const {id} = req.params
    const {_id, password, google, correo, ...resto} = req.body

    //TODO validar contra BD
    if(password){
        //encriptar la contraseña
        const salt = bcryptjs.genSaltSync()
        resto.password = bcryptjs.hashSync(password, salt)
    }
    //lo q sea q mande, lo voy a actualizar en la BD
    const usuario = await Usuario.findByIdAndUpdate(id, resto); 

    res.json( usuario)
}

const usuariosPost = async  (req,res = response) => {
    //manejo de errores
    

    const {nombre, correo, password, rol} = req.body
    const usuario = new Usuario({rol, nombre, correo, password})

    //verificar si el correo existe
    const existeEmail = await Usuario.findOne({correo});
    if(existeEmail){
        return res.status(400).json({
            msg: "El correo ya esta Registrado"
        })
    }
    //encriptar la contraseña
    const salt = bcryptjs.genSaltSync()
    usuario.password = bcryptjs.hashSync(password, salt)
    //guardar en base de datos

    await usuario.save(); 
    
    res.status(201).json({
        
        usuario
    })
}

const usuariosDelete = async (req,res = response) => {

    const {id} = req.params 
    //fisicamente lo borramos
    //const usuario = await Usuario.findByIdAndDelete(id)
    const uid = req.uid; 
    const userToDelete = await Usuario.findById(id)
    if(userToDelete.estado === false){
        return res.status(404).send({
            msg:`el id: ${id} no esta en la BD`
        })
    }
    const usuario = await Usuario.findByIdAndUpdate(id, {estado: false} )
    usuario.estado = false;
    const usuarioAutentiado = req.usuario
    res.json({usuario, usuarioAutentiado})
}



module.exports = {
    usuariosGet,
    usuariosPut,
    usuariosPost,
    usuariosDelete
}

