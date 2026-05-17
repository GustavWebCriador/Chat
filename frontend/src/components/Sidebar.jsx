import OnlineUsers from './OnlineUsers'

import GroupList from './GroupList'

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

  sair

}) {

  return (

    <div className="sidebar">

      <div className="sidebar-top">

        <h2>
          {usuario?.nome}
        </h2>

        <button onClick={sair}>
          Sair
        </button>

      </div>

      <div className="group-create">

        <input
          type="text"

          placeholder="Novo grupo"

          value={novoGrupo}

          onChange={(e) =>
            setNovoGrupo(
              e.target.value
            )
          }
        />

        <button
          onClick={criarGrupo}
        >
          Criar
        </button>

      </div>

      <GroupList

        grupos={grupos}

        grupoSelecionado={
          grupoSelecionado
        }

        selecionarGrupo={
          selecionarGrupo
        }

      />

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

      />

    </div>
  )
}