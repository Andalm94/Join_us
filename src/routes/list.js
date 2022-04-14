const express = require('express');
const router = express.Router();

const pool = require('../database');

router.get('/list', async (req, res) => {
    const count = await pool.query('SELECT * FROM users');
    
    res.render('list', {count});
});

module.exports = router;