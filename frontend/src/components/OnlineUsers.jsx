export default function OnlineUsers({

  usuariosOnline,

  selecionarUsuario,

  usuarioSelecionado,

  usuarioAtual

}) {

  return (

    <div className="online-users">

      <h3>
        Usuários Online
      </h3>

      {usuariosOnline

        .filter(
          (user) =>
            user.nome
            !== usuarioAtual.nome
        )

        .map((user) => (

          <div
            key={user.id}

            className={
              usuarioSelecionado?.id
              === user.id

              ? 'online-user active'

              : 'online-user'
            }

            onClick={() =>
              selecionarUsuario(
                user
              )
            }
          >

            🟢 {user.nome}

          </div>
      ))}

    </div>
  )
}