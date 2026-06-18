import React, {
  useState,
  useEffect
} from 'react'

import {
  useNavigate,
  Link
} from 'react-router-dom'

import api from '../services/api'

export default function Login() {

  const navigate =
    useNavigate()

  const [email, setEmail] =
    useState('')

  const [senha, setSenha] =
    useState('')

  const [mostrarSenha,
    setMostrarSenha] =
    useState(false)

  const [loading,
    setLoading] =
    useState(false)

  const [erro, setErro] =
    useState('')

  /* REDIRECIONA SE JÁ ESTIVER LOGADO */

  useEffect(() => {

    const token =
      localStorage.getItem(
        'token'
      )

    if (token) {

      navigate('/chat')
    }

  }, [])

  async function fazerLogin(e) {

    e.preventDefault()

    setErro('')

    if (
      !email.trim()
      ||
      !senha.trim()
    ) {

      setErro(
        'Preencha todos os campos'
      )

      return
    }

    try {

      setLoading(true)

      const response =
        await api.post(
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

      navigate('/chat')

    } catch (error) {

      console.log(error)

      setErro(
        'Email ou senha inválidos'
      )

    } finally {

      setLoading(false)
    }
  }

  return (

    <div className="login-container">

      <form
        className="login-box"
        onSubmit={fazerLogin}
      >

        <h1>

          Chat Corporativo

        </h1>

        <p className="login-subtitle">

          Entre na sua conta

        </p>

        {

          erro && (

            <div className="login-error">

              {erro}

            </div>
          )
        }

        <input
          type="email"

          placeholder="Digite seu email"

          value={email}

          onChange={(e) =>
            setEmail(
              e.target.value
            )
          }
        />

        <div className="password-area">

          <input
            type={
              mostrarSenha
                ? 'text'
                : 'password'
            }

            placeholder="Digite sua senha"

            value={senha}

            onChange={(e) =>
              setSenha(
                e.target.value
              )
            }
          />

          <button
            type="button"

            className="show-password"

            onClick={() =>
              setMostrarSenha(
                !mostrarSenha
              )
            }
          >

            {

              mostrarSenha
                ? 'Ocultar'
                : 'Mostrar'
            }

          </button>

        </div>

        <button
          type="submit"

          disabled={loading}
        >

          {

            loading
              ? 'Entrando...'
              : 'Entrar'
          }

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