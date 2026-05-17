import { useState } from 'react'

import {
  useNavigate,
  Link
} from 'react-router-dom'

import api from '../services/api'

export default function Register() {

  const navigate = useNavigate()

  const [nome, setNome] = useState('')

  const [email, setEmail] = useState('')

  const [senha, setSenha] = useState('')

  async function criarConta(e) {

    e.preventDefault()

    try {

      await api.post(
        '/auth/register',
        {
          nome,
          email,
          senha
        }
      )

      alert('Conta criada com sucesso')

      navigate('/login')

    } catch (error) {

      console.log(error)

      alert('Erro ao criar conta')
    }
  }

  return (

    <div className="login-container">

      <form
        className="login-box"
        onSubmit={criarConta}
      >

        <h1>Cadastro</h1>

        <input
          type="text"
          placeholder="Digite seu nome"
          value={nome}
          onChange={(e) =>
            setNome(e.target.value)
          }
        />

        <input
          type="email"
          placeholder="Digite seu email"
          value={email}
          onChange={(e) =>
            setEmail(e.target.value)
          }
        />

        <input
          type="password"
          placeholder="Digite sua senha"
          value={senha}
          onChange={(e) =>
            setSenha(e.target.value)
          }
        />

        <button type="submit">

          Criar Conta

        </button>

        <p
          style={{
            textAlign: 'center'
          }}
        >

          Já possui conta?

          <Link to="/login">

            Fazer login

          </Link>

        </p>

      </form>

    </div>
  )
}