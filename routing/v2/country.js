const { pool } = require('../../util/mariadb')
const express = require('express')
const router = express.Router()

router.get('/countries/:countryId', async function (req, res) {
    let conn, rows;
    try {
        conn = await pool.getConnection();
        rows = await conn.query("SELECT * FROM countries where country_id=?", [req.params.countryId]);
    } catch (e) {
        console.log('error', e)
    } finally {
        if (conn) conn.release();
    }
    // res.send('verifyToken')
    res.json({ status: 'OK', rows })
})

router.get('/countries', async function (req, res) {
    let conn, rows;
    try {
        conn = await pool.getConnection();
        rows = await conn.query("SELECT * FROM countries");
    } catch (e) {
        console.log('error', e)
    } finally {
        if (conn) conn.release();
    }
    // res.send('verifyToken')
    res.json({ status: 'OK', rows })
})

router.get('/continents', async function (req, res) {
    let conn, rows;
    try {
        conn = await pool.getConnection();
        rows = await conn.query("SELECT * FROM continents");
    } catch (e) {
        console.log('error', e)
    } finally {
        if (conn) conn.release();
    }
    // res.send('verifyToken')
    res.json({ status: 'OK', rows })
})

module.exports = router