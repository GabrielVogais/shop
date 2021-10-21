//Carregando Módulos

const express = require("express");
const Bcrypt = require('bcrypt')
const axios = require('axios').default;
const cors = require('cors')
const app = express();
const path = require('path')
const routes = require('./routes/acesso')
const Handlebars = require('handlebars');
const LocalStorage = require('node-localstorage').LocalStorage

//Configurações

app.use(express.static(path.join(__dirname, "public")))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*")
    app.use(cors)
    next();
})
localStorage = new LocalStorage('./scratch');
const port = process.env.PORT || 3000


//Middlewares 


const verifica = (req, res, next) => {
    try {
        if (localStorage.getItem("usuario") == "" || localStorage.getItem("usuario") == undefined) {
            res.redirect('/acesso')
        } else {
            axios.post('https://api-otaku.herokuapp.com/verifica-token', new URLSearchParams({
                'usuario': `${localStorage.getItem("usuario")}`
            })).then((response) => {
                console.log(response.data)
                if (response.data.status == true) {
                    next();
                } else {
                    res.redirect('/acesso')
                }
            })
        }
    } catch (error) {
        console.log("TRY: Eu que redirecionei")
        res.redirect('/acesso')
    }
}



//Handlebars

const handlebars = require("express-handlebars");
app.engine("handlebars", handlebars({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars');

//Rotas

app.use('/', routes)


//Helpers

Handlebars.registerHelper('switch', function (value, options) {
    this.switch_value = value;
    return options.fn(this);
});

Handlebars.registerHelper('case', function (value, options) {
    if (value == this.switch_value) {
        return options.fn(this);
    }
});
Handlebars.registerHelper('multiply', (value1, value2) => {
    return (value1 * value2).toFixed(2)
})



// app.get("/teste", (req, res) => {
//     teste(Bcrypt);
//     res.json({ status: "Testando" })
// })
app.get("/", (req, res) => {
    axios.get("https://api-otaku.herokuapp.com/destaques").then((response) => {
        res.render('home', { destaques: response.data })
    })
})
// app.get("/login", (req, res) => {
//     res.render('login', { layout: 'other' })
// })
// app.get("/acess", (req, res) => {
//     res.render('acess', { layout: 'other' })
// })
app.get("/detalhes/:id", (req, res) => {
    axios.post("https://api-otaku.herokuapp.com/detalhes", { id: req.params.id }).then((response) => {
        res.render('details', { data: response.data })
    })
})
app.get("/carrinho", verifica, (req, res) => {
    axios.post("https://api-otaku.herokuapp.com/carrinho", { usuario: "jubileu" }).then((response) => {
        res.render('carrinho', { produtos: response.data, title: "Carinho" })
    })
})
app.get("/produtos", (req, res) => {
    axios.get("https://api-otaku.herokuapp.com/produtos").then((response) => {
        res.render('produtos', { produtos: response.data })
    })

})



app.listen(port, () => {
    console.log("Rodando servidor na porta " + port);
})
module.exports = { axios, Bcrypt }