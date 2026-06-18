import React from 'react';

export default function MessageInput({

  mensagem,

  setMensagem,

  enviarMensagem

}) {

  return (

    <div className="message-input-area">

      <input
        type="text"

        placeholder="Digite sua mensagem"

        value={mensagem}

        onChange={(e) =>
          setMensagem(
            e.target.value
          )
        }

        onKeyDown={(e) => {

          if (e.key === 'Enter') {

            enviarMensagem()
          }
        }}
      />

      <button
        onClick={enviarMensagem}
      >
        Enviar
      </button>

    </div>
  )
}