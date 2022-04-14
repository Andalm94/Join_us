const { response, request } = require('express');
const express = require('express');
const router = express.Router();

const pool = require('../database');




router.get('/', async (req, res) => {
    const count = await pool.query('SELECT COUNT(*) FROM users');
    var jugadores = Object.values(count[0]);
    
    res.render('home', {jugadores});
});

router.post('/', async (req, res)=>{
    const { name , profession, password } = req.body;
    const newUser = {
        name,
        profession,
        password
    };
    console.log(newUser);
    await pool.query('INSERT INTO users set ?', [newUser]);
    req.flash('success', 'New character');
    res.redirect('/');
});

module.exports = router;

