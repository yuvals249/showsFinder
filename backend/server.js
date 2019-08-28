const express = require('express')
const app = express()
const port = process.env.PORT || 8080 
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const router = require('./server/routes/api')
const path = require ('path')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.use(express.static(path.join(__dirname, 'build')));

// app.use(function (req, res, next) {
//     res.header('Access-Control-Allow-Origin', '*')
//     res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS')
//     res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With')

//     next()
// })

app.use('/', router)


app.get('*', function (req, res) {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/showsFinder', { useNewUrlParser: true }).then(() => {
    app.listen(port, () => console.log(`Running server on port ${port}`))
})

