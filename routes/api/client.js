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

module.exports = router