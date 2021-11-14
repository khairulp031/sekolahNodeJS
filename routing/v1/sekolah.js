const Sekolah = require('../../services/sekolah')
const express = require('express')
const router = express.Router()

router.post('/', async function  (req, res) {
    console.log('req',req.body)
    await Sekolah.upsert_(req.body)
    const data= await Sekolah.findByNama(req.body.nama)
    const data1= await Sekolah.findBy_id('617e6caf0e367dbf63c151c5')
    const count= await Sekolah.count_()
    const aggregate= await Sekolah.aggregate_()
   // res.send('verifyToken')
    res.json({ status: 'OK', data, data1, count, aggregate})
})


module.exports = router