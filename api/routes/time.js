const express = require('express');
const router = express.Router();
const cors = require('cors');

const midCache = (req, res, next) => {
    res.set('Cache-Control','no-cache');
    next()
}

const checkAuth = (req, res, next) => {
    const user = req.body.user;
    const password = req.body.password;
    if(!user || !password) {
        res.status(401).send({message:"Usuario y/ Contraseña incorrecta"})
    } 
    next()
}

router.post('/',cors(),  checkAuth, midCache,(req,res) => {
    const user = req.body;
    const respuesta = {
        user: user,
        date: new Date().toLocaleString()
    }
    res.json(respuesta)
})

module.exports = router
