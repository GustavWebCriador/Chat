require('dotenv').config()

const app = require('./app')

const http = require('http')

const { Server } = require('socket.io')

const server = http.createServer(app)

const io = new Server(server, {
  cors: {
    origin: '*'
  }
})

let usuariosOnline = []

let grupos = [
  {
    id: 1,
    nome: 'Geral'
  }
]

io.on('connection', (socket) => {

  console.log('Usuário conectado')

  socket.on(
    'entrar_chat',
    (usuario) => {

      socket.usuario = usuario

      usuariosOnline =
        usuariosOnline.filter(
          (u) => u.nome !== usuario
        )

      usuariosOnline.push({
        id: socket.id,
        nome: usuario
      })

      io.emit(
        'usuarios_online',
        usuariosOnline
      )

      io.emit(
        'lista_grupos',
        grupos
      )
    }
  )

  socket.on(
    'criar_grupo',
    (nomeGrupo) => {

      const grupoExiste =
        grupos.find(
          (g) =>
            g.nome === nomeGrupo
        )

      if (grupoExiste) return

      const novoGrupo = {

        id: Date.now(),

        nome: nomeGrupo
      }

      grupos.push(
        novoGrupo
      )

      io.emit(
        'lista_grupos',
        grupos
      )
    }
  )

  socket.on(
    'entrar_grupo',
    (grupoId) => {

      socket.join(
        `grupo_${grupoId}`
      )

      console.log(
        `Usuário entrou no grupo ${grupoId}`
      )
    }
  )

  socket.on(
    'mensagem_grupo',
    (dados) => {

      console.log(
        'Mensagem grupo:',
        dados
      )

      const mensagemCompleta = {

        grupoId:
          dados.grupoId,

        usuario:
          dados.usuario,

        mensagem:
          dados.mensagem,

        horario:
          new Date()
            .toLocaleTimeString()
      }

      io.to(
        `grupo_${dados.grupoId}`
      ).emit(
        'receber_mensagem_grupo',
        mensagemCompleta
      )
    }
  )

  socket.on(
    'mensagem_privada',
    (dados) => {

      const mensagemCompleta = {

        usuario:
          dados.usuario,

        mensagem:
          dados.mensagem,

        destinatarioId:
          dados.destinatarioId,

        remetenteId:
          socket.id,

        remetenteNome:
          socket.usuario,

        horario:
          new Date()
            .toLocaleTimeString()
      }

      io.to(
        dados.destinatarioId
      ).emit(
        'receber_mensagem_privada',
        mensagemCompleta
      )

      socket.emit(
        'receber_mensagem_privada',
        mensagemCompleta
      )
    }
  )

  socket.on(
    'disconnect',
    () => {

      usuariosOnline =
        usuariosOnline.filter(
          (u) =>
            u.id !== socket.id
        )

      io.emit(
        'usuarios_online',
        usuariosOnline
      )

      console.log(
        'Usuário saiu'
      )
    }
  )
})

server.listen(
  3001,
  '0.0.0.0',
  () => {

    console.log(
      'Servidor rodando na porta 3001'
    )
  }
)