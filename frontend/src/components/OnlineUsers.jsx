export default function OnlineUsers({

  usuariosOnline,

  selecionarUsuario,

  usuarioSelecionado,

  usuarioAtual,

  naoLidas

}) {

  return (

    <div className="sidebar-list">

      {usuariosOnline

        .filter(
          (user) =>
            user.nome !==
            usuarioAtual?.nome
        )

        .map((user) => (

          <div

            key={user.id}

            className={`sidebar-item ${
              usuarioSelecionado?.id
              === user.id
                ? 'active'
                : ''
            }`}

            onClick={() =>
              selecionarUsuario(user)
            }
          >

            <div className="online-dot" />

            <span>
              {user.nome}
            </span>

            {

              naoLidas?.[user.id]
              > 0 && (

                <div className="notification-badge">

                  {
                    naoLidas[user.id]
                  }

                </div>
              )
            }

          </div>
        ))}
    </div>
  )
}