import { useState } from 'react'

import {
  useNavigate,
  Link
} from 'react-router-dom'

import api from '../services/api'

export default function Login() {

  const navigate = useNavigate()

  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')

  async function fazerLogin(e) {

    e.preventDefault()

    try {

      const response = await api.post(
        '/auth/login',
        {
          email,
          senha
        }
      )

      localStorage.setItem(
        'token',
        response.data.token
      )

      localStorage.setItem(
        'usuario',
        JSON.stringify(
          response.data.usuario
        )
      )

      alert('Login realizado')

      navigate('/chat')

    } catch (error) {

      console.log(error)

      alert('Email ou senha inválidos')
    }
  }

  return (

    <div className="login-container">

      <form
        className="login-box"
        onSubmit={fazerLogin}
      >

        <h1>Login</h1>

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

          Entrar

        </button>

        <p
          style={{
            textAlign: 'center'
          }}
        >
          Não possui conta?&nbsp;

          <Link to="/register">

            Criar conta

          </Link>

        </p>

      </form>

    </div>
  )
}