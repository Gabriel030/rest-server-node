const { check } = require("express-validator");
const { esRoleValido, emailExiste, existeUsuarioPorId } = require("./db-validators");


const postValidationList = [
    check("nombre", "El nombre no es valido").not().isEmpty(),
    check("password", "El password debe de ser mas de 6 letras").isLength({min:6}),
    check("correo", "El correo no es valido").isEmail(),
    check("correo").custom(emailExiste),
    //check("rol", "No es un rol Válido").isIn(["ADMIN_ROLE", "USER_ROLE"]),
    check("rol").custom( esRoleValido), 
    
]

const putValidationList = [
    check("id", "no es un id valido").isMongoId(),    
    check("id").custom( existeUsuarioPorId), //esta es la forma mas larga
    check("rol").custom( esRoleValido), // de esta manera siempre tengo q mandar el rol
    
]

const deleteValidationList = [
    check("id", "no es un id valido").isMongoId(),    
    check("id").custom( existeUsuarioPorId), //esta es la forma mas larga
]

module.exports = {
    postValidationList,
    putValidationList,
    deleteValidationList,
    
}