const express = require('express')

const bcrypt = require('bcrypt')

const jwt = require('jsonwebtoken')

const pool = require('../database/db')

const router = express.Router()

router.post(
  '/register',
  async (req, res) => {

    try {

      const {
        nome,
        email,
        senha
      } = req.body

      const senhaCriptografada =
        await bcrypt.hash(
          senha,
          10
        )

      const novoUsuario =
        await pool.query(

        `
          INSERT INTO usuarios
          (nome, email, senha)

          VALUES ($1, $2, $3)

          RETURNING *
        `,

        [
          nome,
          email,
          senhaCriptografada
        ]
      )

      res.json(
        novoUsuario.rows[0]
      )

    } catch (error) {

      console.log(error)

      res.status(500).json({
        erro:
          'Erro ao cadastrar'
      })
    }
  }
)

router.post(
  '/login',
  async (req, res) => {

    try {

      const {
        email,
        senha
      } = req.body

      const usuario =
        await pool.query(

        `
          SELECT *
          FROM usuarios
          WHERE email = $1
        `,

        [email]
      )

      if (
        usuario.rows.length === 0
      ) {

        return res.status(401)
          .json({
            erro:
            'Usuário não encontrado'
          })
      }

      const usuarioEncontrado =
        usuario.rows[0]

      const senhaCorreta =
        await bcrypt.compare(
          senha,
          usuarioEncontrado.senha
        )

      if (!senhaCorreta) {

        return res.status(401)
          .json({
            erro:
            'Senha inválida'
          })
      }

      const token = jwt.sign(

        {
          id:
          usuarioEncontrado.id
        },

        'segredo_chat',

        {
          expiresIn: '1d'
        }
      )

      res.json({

        token,

        usuario: {

          id:
            usuarioEncontrado.id,

          nome:
            usuarioEncontrado.nome,

          email:
            usuarioEncontrado.email
        }
      })

    } catch (error) {

      console.log(error)

      res.status(500).json({
        erro:
          'Erro no login'
      })
    }
  }
)

module.exports = router