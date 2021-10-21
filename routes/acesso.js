const express = require("express");
const bcrypt = require('bcrypt');
const axios = require('axios').default
const router = express.Router();
const crypto = require('crypto')
const LocalStorage = require('node-localstorage').LocalStorage
localStorage = new LocalStorage('./scratch');

router.post("/redirect-cadastro", (req, res) => {
    axios.post('https://api-otaku.herokuapp.com/cadastro', new URLSearchParams({
        'usuario': `${req.body.usuario}`,
        'senha': `${bcrypt.hashSync(req.body.senha, 10)}`,
        'email': `${req.body.email}`
    })).then((response) => {
        res.json(response.data)
    }).catch((error) => {
        console.log(error)
    });
})
router.post("/redirect-login", (req, res) => {
    axios.post('https://api-otaku.herokuapp.com/login', new URLSearchParams({
        'usuario': `${req.body.usuario}`,
        'senha': `${req.body.senha}`
    })).then((response) => {
        if (response.data.alert == "green") {
            localStorage.setItem("usuario", req.body.usuario)
        }
        res.json(response.data)
    }).catch((error) => {
        console.log(error)
    });
})


router.get("/acesso", (req, res) => {
    res.render('acesso', { layout: 'other', title: "Acesso" })
})


module.exports = router;