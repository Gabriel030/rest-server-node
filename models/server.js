const express = require('express')
const cors = require('cors')
//server basado en clases
class Server{

    constructor() {
        this.app = express()

        this.port = process.env.PORT || 8080; 
    
 
        this.usuariosPath = "/api/usuarios"
        
        //CORS
        this.app.use(cors())

        //lectura del body en peticiones         
         //looks at requests where the Content-Type header matches the type option
        this.app.use(express.json())

        //Middlewares
        this.middleware()
        //rutas de mi aplicacion
        this.routes();
    }

    middleware(){
        //directorio publico
        this.app.use(express.static("public"))
    }

    routes() {
        this.app.use(this.usuariosPath, require("../routes/usuarios.routes"))
    }


    listen() {
        this.app.listen( this.port ,() => {
            console.log("Servidor corriendo en puerto",this.port)   
        })
    }


}



module.exports = Server; 
