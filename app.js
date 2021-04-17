require('dotenv').config()
const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require("mongoose")
// connect db
mongoose.set('useFindAndModify', false)
mongoose.connect(process.env["MONGODB_URI"], {useNewUrlParser: true, useUnifiedTopology: true});

// confiugre middlewares
// configure CORS
const corsOptions = {
    origin: 'https://cupola.herokuapp.com/',
    optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
    methods: ['GET', 'PUT', 'POST', "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "X-Requested-With", "Origin"]
}

app.use(cors(corsOptions))
// app.use((req, res, next) => {
//     res.header('Access-Control-Allow-Origin', '*')
//     res.header('Access-Control-Allow-Headers',
//         'Content-Type, X-Requested-With, Origin')
//     res.header('Access-Control-Allow-Methods',
//         'GET, POST, PUT, PATCH, DELETE, OPTIONS')
//     next()
// })
app.use(express.json())
app.use(express.urlencoded({ extended: false }));

// import controllers
require('./controllers/catering-controller')(app)
require('./controllers/customer-controller')(app)
require("./controllers/listing-controller")(app)


app.get("/", (req, res) => {
    res.send("Hello, World")
})

app.get("/test", (req, res) => {
    res.send("Hello, Test")
})

app.post("/test", (req, res) => {
    const data = JSON.parse(JSON.stringify(req.body))
    console.log(data)
    res.send(data)
})

app.listen(process.env.PORT || 3000)
