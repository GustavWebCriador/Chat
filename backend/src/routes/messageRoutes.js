const express =
  require('express')

const router =
  express.Router()

const Message =
  require('../models/Message')

router.get(
  '/grupo/:grupoId',
  async (req, res) => {

    try {

      const mensagens =
        await Message.find({

          tipo: 'grupo',

          grupoId:
            req.params.grupoId
        })

        .sort({
          createdAt: 1
        })

      res.json(
        mensagens
      )

    } catch (error) {

      res.status(500).json({

        erro:
          'Erro ao buscar mensagens'
      })
    }
  }
)

module.exports = router