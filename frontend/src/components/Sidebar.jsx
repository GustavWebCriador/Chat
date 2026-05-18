import { useState } from 'react'

import {
  LogOut,
  Plus,
  Users,
  MessageCircle
} from 'lucide-react'

import OnlineUsers
  from './OnlineUsers'

import GroupList
  from './GroupList'

export default function Sidebar({

  usuario,

  usuariosOnline,

  grupos,

  grupoSelecionado,

  selecionarGrupo,

  selecionarUsuario,

  usuarioSelecionado,

  novoGrupo,

  setNovoGrupo,

  criarGrupo,

  naoLidas,

  sair

}) {

  const [
    mostrarCriarGrupo,
    setMostrarCriarGrupo
  ] = useState(false)

  function handleCriarGrupo() {

    criarGrupo()

    setMostrarCriarGrupo(false)
  }

  return (

    <div className="sidebar">

      {/* TOPO */}

      <div className="sidebar-top">

        <div className="sidebar-user">

          <div className="user-avatar">

            {
              usuario?.nome
                ?.charAt(0)
                ?.toUpperCase()
            }

          </div>

          <div className="user-info">

            <h2>
              {usuario?.nome}
            </h2>

            <div className="user-status">

              <span className="status-dot" />

              Online

            </div>

          </div>

        </div>

        <button
          className="logout-btn"
          onClick={sair}
        >
          <LogOut size={18} />
        </button>

      </div>

      {/* GRUPOS */}

      <div className="section-header">

        <div className="section-title">

          <Users size={15} />

          <span>
            Grupos
          </span>

        </div>

        <button
          className="add-btn"
          onClick={() =>
            setMostrarCriarGrupo(
              !mostrarCriarGrupo
            )
          }
        >
          <Plus size={16} />
        </button>

      </div>

      {
        mostrarCriarGrupo && (

          <div className="group-create">

            <input
              type="text"

              placeholder="Nome do grupo"

              value={novoGrupo}

              onChange={(e) =>
                setNovoGrupo(
                  e.target.value
                )
              }

              onKeyDown={(e) => {

                if (e.key === 'Enter') {

                  handleCriarGrupo()
                }
              }}
            />

            <button
              onClick={
                handleCriarGrupo
              }
            >
              Criar
            </button>

          </div>
        )
      }

      <GroupList

        grupos={grupos}

        grupoSelecionado={
          grupoSelecionado
        }

        selecionarGrupo={
          selecionarGrupo
        }

      />

      {/* ONLINE */}

      <div className="section-header">

        <div className="section-title">

          <MessageCircle size={15} />

          <span>
            Usuários Online
          </span>

        </div>

      </div>

      <OnlineUsers

        usuariosOnline={
          usuariosOnline
        }

        selecionarUsuario={
          selecionarUsuario
        }

        usuarioSelecionado={
          usuarioSelecionado
        }

        usuarioAtual={usuario}

        naoLidas={naoLidas}

      />

    </div>
  )
}