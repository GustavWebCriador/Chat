export default function GroupList({

  grupos,

  grupoSelecionado,

  selecionarGrupo

}) {

  return (

    <div>

      <h3>
        Grupos
      </h3>

      {grupos.map(
        (grupo) => (

        <div
          key={grupo.id}

          className={
            grupoSelecionado?.id
            === grupo.id

            ? 'online-user active'

            : 'online-user'
          }

          onClick={() =>
            selecionarGrupo(
              grupo
            )
          }
        >

          # {grupo.nome}

        </div>
      ))}

    </div>
  )
}