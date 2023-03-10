const { triggerAsyncId } = require('async_hooks');
const { Schema, model } = require('mongoose');
const UsuarioSchema = Schema({  			  
  nombre: {
    type: String,
    required: [true, "El nombre es Obligatorio"]   
  },
  correo: {
    type: String,
    required: [true, "El correo es Obligatorio"]  ,
    unique: true,
  },  
  password: {
    type: String,
    required: [true, "El password es Obligatorio"]   
  },
  img: {
    type: String,    
    emun : ["ADMIN_ROLE", "USER_ROLE"]
  },
  estado: {
    type: Boolean,
    default: true,
  },
  google: {
    type: Boolean,
    default: false,
  }
});	

UsuarioSchema.methods.toJSON = function() {
    const {__v, password, ...usuario} = this.toObject();
    return usuario
}

module.exports = model('Usuario', UsuarioSchema);