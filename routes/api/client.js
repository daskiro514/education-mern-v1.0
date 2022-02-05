const express = require('express')
const router = express.Router()

const User = require('../../models/User')

router.get('/getAdmin', async (req, res) => {
  const adminFromDB = await User.findOne({ type: 'admin' })
  const admin = {
    _id: adminFromDB._id,
    firstName: adminFromDB.firstName,
    lastName: adminFromDB.lastName
  }

  res.json({
    success: true,
    admin
  })
})

router.get('/getClient/:id', async (req, res) => {
  const clientID = req.params.id
  const client = await User.findById(clientID)

  res.json({
    success: true,
    client
  })
})

router.delete('/deleteClient/:id', async (req, res) => {
  const clientID = req.params.id
  await User.findByIdAndDelete(clientID)

  res.json({
    success: true
  })
})

module.exports = router