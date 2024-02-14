const express = require('express');
const router = express.Router() 
const { CreateAbility} = require('../controllers/abilityController')

router.post ("/createability", CreateAbility)

module.exports = router 