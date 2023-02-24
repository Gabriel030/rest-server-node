const {Router} = require("express");
const { login } = require("../controllers/auth.controller");
const { loginValidationList } = require("../helpers/validationList");
const validarCampos = require("../middlewares/validar-campos");
const router = Router();



router.post("/login",loginValidationList, validarCampos,  login)


module.exports = router