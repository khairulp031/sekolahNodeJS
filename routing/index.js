const express = require('express')
const router = express.Router()
const sekolah = require('./v1/sekolah')
const country = require('./v1/country')
const country_v2 = require('./v2/country')

router.use('/v1/sekolah', sekolah)
router.use('/v1/nation', country)
router.use('/v2/nation', country_v2)


module.exports = router