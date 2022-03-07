const express = require('express');
const req = require('express/lib/request');
const router = express.Router();
const Joi = require('joi');
const users = [] // "Persistencia"

router.get('/', (req,res) => {
    const user = {
        id: users.length + 1,
        name: 'Mauricio',
        age: '54',
        url: req.originalUrl
    }
    res.status(200).send(user)
});

//Create new user
router.post('/', (req, res) => {
    const schema = Joi.object ({
        name: Joi.string().required().min(3),
        age: Joi.number().required().greater(17),
    });
    
    const {error, result} = schema.validate(req.body);
    
    if(error) return res.status(400).send(error.details[0].message);
    
    const user = {
        id: users.length + 1,
        name: req.body.name,
        age: req.body.age,
        url: req.originalUrl
    }
    users.push(user);
    res.send(users);
});


module.exports = router
