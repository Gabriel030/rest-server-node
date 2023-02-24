const express = require('express')
const cors = require('cors');
const { dbConnection } = require('../database/config');
//server basado en clases
class Server{

    constructor() {
        this.app = express()
        this.port = process.env.PORT || 8080; 
        this.usuariosPath = "/api/usuarios"
        this.authPath = "/api/auth"
        
        //Conectar a BD
        this.conectarDB(); 
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

    async conectarDB() {
        await dbConnection();
    }
    middleware(){
        //directorio publico
        this.app.use(express.static("public"))
    }

    routes() {
        this.app.use(this.usuariosPath, require("../routes/usuarios.routes"))
        this.app.use(this.authPath, require("../routes/auth.routes"))
    }


    listen() {
        this.app.listen( this.port ,() => {
            console.log("Servidor corriendo en puerto",this.port)   
        })
    }


}



module.exports = Server; 
