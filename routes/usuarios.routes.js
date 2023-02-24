const {Router} =  require("express");
const { usuariosGet, usuariosPut, usuariosDelete, usuariosPost } = require("../controllers/usuarios.controller");
const { postValidationList, putValidationList, deleteValidationList } = require("../helpers/validationList");
const validarCampos = require("../middlewares/validar-campos");
const { validarJWT } = require("../middlewares/validar-jwt");
const { esAdminRol, tieneRole } = require("../middlewares/validar-roles");

const router = Router();

router.get("/", usuariosGet)
router.put("/:id",putValidationList, validarCampos , usuariosPut)
router.post("/", postValidationList, validarCampos, usuariosPost )
router.delete("/:id",validarJWT, tieneRole("USER_ROLE","ADMIN_ROLE"), deleteValidationList, validarCampos,  usuariosDelete)

module.exports = router

