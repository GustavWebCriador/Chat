const mongoose =
  require('mongoose')

const MessageSchema =

  new mongoose.Schema({

    tipo: {
      type: String,
      required: true
    },

    usuario: {
      type: String,
      required: true
    },

    mensagem: {
      type: String,
      required: true
    },

    grupoId: Number,

    destinatarioId: String,

    remetenteId: String,

    remetenteNome: String,

    horario: {
      type: Date,
      default: Date.now
    }

  }, {

    timestamps: true
  })

module.exports =

  mongoose.model(
    'Message',
    MessageSchema
  )