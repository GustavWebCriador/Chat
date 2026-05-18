export default function GroupList({

  grupos,

  grupoSelecionado,

  selecionarGrupo

}) {

  return (

    <div className="sidebar-list">

      {
        grupos.map(
          (grupo) => (

            <div

              key={grupo.id}

              className={

                grupoSelecionado
                ?.id === grupo.id

                ? 'sidebar-item active'

                : 'sidebar-item'
              }

              onClick={() =>
                selecionarGrupo(
                  grupo
                )
              }
            >

              <span>
                # {grupo.nome}
              </span>

            </div>
          ))
      }

    </div>
  )
}