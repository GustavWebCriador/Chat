import React from 'react';

export default function Header({

  grupoSelecionado,

  usuarioSelecionado

}) {

  return (

    <div className="chat-header">

      {

        usuarioSelecionado

        ? `Conversa com ${usuarioSelecionado.nome}`

        : grupoSelecionado

        ? `# ${grupoSelecionado.nome}`

        : 'Selecione uma conversa'
      }

    </div>
  )
}