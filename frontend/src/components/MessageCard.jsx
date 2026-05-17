export default function MessageCard({

  msg,

  usuarioAtual

}) {

  const minhaMensagem =

    msg.usuario
    === usuarioAtual

  return (

    <div
      className={

        minhaMensagem

        ? 'message-row own'

        : 'message-row'
      }
    >

      <div
        className={

          minhaMensagem

          ? 'message-card own'

          : 'message-card'
        }
      >

        <div className="message-top">

          <strong>
            {msg.usuario}
          </strong>

          <span>
            {msg.horario}
          </span>

        </div>

        <p>
          {msg.mensagem}
        </p>

      </div>

    </div>
  )
}