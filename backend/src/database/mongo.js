const mongoose = require('mongoose')

async function conectarMongo() {
    try {
        await mongoose.connect(
            'mongodb://127.0.0.1:27017/chat-trabalho'
        )
        console.log(
            'MongoDB conectado'
        )
    } catch (error) {
        console.log(error)
    }
}
module.exports = conectarMongo