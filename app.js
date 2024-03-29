require('dotenv').config()
const express = require('express')
const app = express()
const port = process.env.PORT || 3001
const session = require('express-session')
const cors = require('cors')
const mongoose = require("mongoose")
// connect db
mongoose.set('useFindAndModify', false)
mongoose.connect(process.env["MONGODB_URI"],
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }
)
.then(() => console.log('Connected to mongodb atlas successfully'))
.catch(err => console.log(err))


app.use(session({
    secret: 'keyboard cat',
    resave: true,
    saveUninitialized: true,
    rolling: true,
    cookie: { maxAge: 60000000 }
}))
    
    

// configure middlewares
// configure CORS
const corsOptions = {
    origin: ['https://cupola.herokuapp.com', 'http://localhost:3000'],
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
    if (req.session.views) {
        req.session.views++
        res.setHeader('Content-Type', 'text/html')
        res.write('<p>views: ' + req.session.views + '</p>')
        res.write('<p>expires in: ' + (req.session.cookie.maxAge / 1000) + 's</p>')
        res.end()
      } else {
        req.session.views = 1
        res.end('welcome to the session demo. refresh!')
      }
})

app.get("/test", (req, res) => {
    res.send("Hello, Test")
})

app.post("/test", (req, res) => {
    const data = JSON.parse(JSON.stringify(req.body))
    console.log(data)
    res.send(data)
})

app.listen(port, () => console.log(`Cupola app listening on port ${port}!`))
