const express = require('express')
const router = express.Router()

// For User Generate
const bcrypt = require('bcryptjs')
const normalize = require('normalize-url')
const gravatar = require('gravatar')

// MODEL
const User = require('../../models/User')

router.get('/getAdminClients', async(req, res) => {
  const clients = await User.find({type: 'customer'})

  res.json({
    success: true,
    clients
  })
})

router.get('/getClient/:id', async (req, res) => {
  const client = await User.findById(req.params.id)

  res.json({
    success: true,
    client
  })
})

module.exports = router