const Role = require("../models/role")
const Usuario = require("../models/usuarios")

const esRoleValido = async (rol = "") => {
    const existeRol = await Role.findOne({rol})
    if(!existeRol){
        throw new Error(`El rol ${rol} no esta registrado en la BD`)
    }
}

const emailExiste = async (correo = "") => {
    const e = await Usuario.findOne({correo})
    if(e){
        throw new Error(`El email ${correo} ya esta registrado`)
    }
}

//valido si el id q envio corresponde con uno existente en bd
const existeUsuarioPorId = async (id ) => {
    const existeUsuario = await Usuario.findById(id)
    if( !existeUsuario){
        throw new Error(`El id  ${id} No Existe`)
    }
}

module.exports = {
    esRoleValido,
    emailExiste,
    existeUsuarioPorId
}

