import React from 'react';
import axios from 'axios';

import {
  useEffect,
  useState,
  useRef
} from 'react'

import socket from '../socket'

import Sidebar
  from '../components/Sidebar'

import Header
  from '../components/Header'

import MessageCard
  from '../components/MessageCard'

import MessageInput
  from '../components/MessageInput'

export default function Chat() {

  const usuario = JSON.parse(
    localStorage.getItem('usuario')
  )

  const [mensagem, setMensagem] =
    useState('')

  const [mensagens, setMensagens] =
    useState([])

  const [usuariosOnline,
    setUsuariosOnline] =
    useState([])

  const [grupos, setGrupos] =
    useState([])

  const [grupoSelecionado,
    setGrupoSelecionado] =
    useState(null)

  const [usuarioSelecionado,
    setUsuarioSelecionado] =
    useState(null)

  const [novoGrupo,
    setNovoGrupo] =
    useState('')

  const [naoLidas, setNaoLidas] =
    useState({})

  const messagesEndRef =
    useRef(null)

  const usuarioSelecionadoRef =
    useRef(null)

  /* SOCKET */

  useEffect(() => {

    if (usuario?.nome) {

      socket.emit(
        'entrar_chat',
        usuario.nome
      )
    }

    socket.on(
      'usuarios_online',
      (usuarios) => {

        setUsuariosOnline(
          usuarios
        )
      }
    )

    socket.on(
      'lista_grupos',
      (lista) => {

        setGrupos(lista)
      }
    )

    socket.on(
      'receber_mensagem_grupo',
      (dados) => {

        setMensagens((prev) => [
          ...prev,
          {
            ...dados,
            tipo: 'grupo'
          }
        ])
      }
    )

    socket.on(
      'receber_mensagem_privada',
      (dados) => {

        setMensagens((prev) => [
          ...prev,
          {
            ...dados,
            tipo: 'privado'
          }
        ])

        const conversaAberta =

          usuarioSelecionadoRef.current
          &&

          usuarioSelecionadoRef.current.id
          === dados.remetenteId

        if (!conversaAberta) {

          setNaoLidas((prev) => ({

            ...prev,

            [dados.remetenteId]:

              (prev[dados.remetenteId] || 0)
              + 1
          }))
        }
      }
    )
    socket.on(
      'historico_grupo',
      (historico) => {

        const mensagensFormatadas =
          historico.map((msg) => ({

            _id:
              msg._id,

            tipo:
              msg.tipo,

            grupoId:
              Number(msg.grupoId),

            usuario:
              msg.usuario,

            mensagem:
              msg.mensagem,

            horario:
              new Date(
                msg.horario
              ).toLocaleTimeString(
                'pt-BR',
                {
                  hour: '2-digit',
                  minute: '2-digit'
                }
              )
          }))

        setMensagens((prev) => {

          const mensagensPrivadas =
            prev.filter(
              (msg) =>
                msg.tipo !== 'grupo'
            )

          return [

            ...mensagensPrivadas,

            ...mensagensFormatadas
          ]
        })
      }
    )
    socket.on(
      'historico_privado',
      (historico) => {

        const mensagensFormatadas =
          historico.map((msg) => ({

            _id:
              msg._id,

            tipo:
              msg.tipo,

            usuario:
              msg.usuario,

            mensagem:
              msg.mensagem,

            destinatarioId:
              msg.destinatarioId,

            remetenteId:
              msg.remetenteId,

            remetenteNome:
              msg.remetenteNome,

            horario:
              new Date(
                msg.horario
              ).toLocaleTimeString(
                'pt-BR',
                {
                  hour: '2-digit',
                  minute: '2-digit'
                }
              )
          }))

        setMensagens((prev) => {

          const mensagensGrupo =
            prev.filter(
              (msg) =>
                msg.tipo !== 'privado'
            )

          return [

            ...mensagensGrupo,

            ...mensagensFormatadas
          ]
        })
      }
    )


    return () => {

      socket.off(
        'usuarios_online'
      )

      socket.off(
        'lista_grupos'
      )

      socket.off(
        'receber_mensagem_grupo'
      )

      socket.off(
        'receber_mensagem_privada'
      )
      socket.off(
        'historico_grupo'
      )

      socket.off(
        'historico_privado'
      )

    }

  }, [])

  /* ATUALIZA REF */

  useEffect(() => {

    usuarioSelecionadoRef.current =
      usuarioSelecionado

  }, [usuarioSelecionado])

  /* GRUPO PADRÃO */

  useEffect(() => {

    if (
      grupos.length > 0
      &&
      !grupoSelecionado
    ) {

      setGrupoSelecionado(
        grupos[0]
      )

      socket.emit(
        'entrar_grupo',
        grupos[0].id
      )
    }

  }, [grupos])

  /* AUTO SCROLL */

 useEffect(() => {
  const timer = setTimeout(() => {
    messagesEndRef.current?.scrollIntoView({
      behavior: 'smooth'
    });
  }, 50);

  // Limpa o timer se o componente for desmontado ou se novas mensagens chegarem muito rápido
  return () => clearTimeout(timer);
}, [mensagens]); // Garanta que o nome está idêntico ao do seu useState!

  /* CRIAR GRUPO */

  function criarGrupo() {

    if (!novoGrupo.trim())
      return

    socket.emit(
      'criar_grupo',
      novoGrupo
    )

    setNovoGrupo('')
  }

  /* SELECIONAR GRUPO */

  function selecionarGrupo(
    grupo
  ) {

    setGrupoSelecionado(
      grupo
    )

    setUsuarioSelecionado(
      null
    )

    socket.emit(
      'entrar_grupo',
      grupo.id
    )
  }

  /* SELECIONAR USUÁRIO */

  function selecionarUsuario(
    user
  ) {

    setUsuarioSelecionado(
      user
    )

    setGrupoSelecionado(
      null
    )

    setNaoLidas((prev) => ({

      ...prev,

      [user.id]: 0
    }))
  }
  socket.emit(
  'historico_privado',
  {

    usuarioAtual:
      usuario.nome,

    usuarioDestinoId:
      usuario.id,

    usuarioDestinoNome:
      usuario.nome
  }
)

  /* ENVIAR */

  function enviarMensagem() {

    if (!mensagem.trim())
      return

    if (usuarioSelecionado) {

      socket.emit(
        'mensagem_privada',
        {

          destinatarioId:
            usuarioSelecionado.id,

          usuario:
            usuario.nome,

          mensagem
        }
      )

    } else if (grupoSelecionado) {

      socket.emit(
        'mensagem_grupo',
        {

          grupoId:
            grupoSelecionado.id,

          usuario:
            usuario.nome,

          mensagem
        }
      )
    }

    setMensagem('')
  }

  /* SAIR */

  function sair() {

    localStorage.clear()

    window.location.href =
      '/login'
  }

  return (

    <div className="chat-layout">

      <Sidebar

        usuario={usuario}

        usuariosOnline={
          usuariosOnline
        }

        grupos={grupos}

        grupoSelecionado={
          grupoSelecionado
        }

        selecionarGrupo={
          selecionarGrupo
        }

        selecionarUsuario={
          selecionarUsuario
        }

        usuarioSelecionado={
          usuarioSelecionado
        }

        novoGrupo={novoGrupo}

        setNovoGrupo={
          setNovoGrupo
        }

        criarGrupo={
          criarGrupo
        }

        naoLidas={
          naoLidas
        }

        sair={sair}

      />

      <div className="chat-container">

        <Header

          grupoSelecionado={
            grupoSelecionado
          }

          usuarioSelecionado={
            usuarioSelecionado
          }

        />

        <div className="messages-area">

          {

            grupoSelecionado &&

            mensagens

              .filter(
                (msg) =>

                  msg.tipo
                  === 'grupo'

                  &&

                  msg.grupoId
                  === grupoSelecionado.id
              )

              .map(
                (msg, index) => (

                  <MessageCard
                    key={msg._id || index}
                    msg={msg}
                    usuarioAtual={
                      usuario.nome
                    }
                  />
                ))
          }

          {

            usuarioSelecionado &&

            mensagens

              .filter((msg) =>

                msg.tipo === 'privado'

                &&

                (

                  (

                    msg.usuario
                    === usuario.nome

                    &&

                    msg.destinatarioId
                    === usuarioSelecionado.id
                  )

                  ||

                  (

                    msg.remetenteNome
                    === usuarioSelecionado.nome

                    &&

                    msg.usuario
                    === usuarioSelecionado.nome
                  )
                )
              )

              .map((msg, index) => (

                <MessageCard
                  key={index || index}
                  msg={msg}
                  usuarioAtual={
                    usuario.nome
                  }
                />
              ))
          }

          <div ref={messagesEndRef} />

        </div>

        <MessageInput

          mensagem={mensagem}

          setMensagem={
            setMensagem
          }

          enviarMensagem={
            enviarMensagem
          }

        />

      </div>

    </div>
  )
}