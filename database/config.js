const mongoose = require("mongoose")

const dbConnection  = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_CNN, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        console.log("Base de Datos Online")

    } catch (error) {
        throw new Error("Error al inicializar DB")
        console.log(error)
    }
}


module.exports = {
    dbConnection
}