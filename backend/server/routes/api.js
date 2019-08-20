const express = require('express')
const router = express.Router()
const Show = require('../model/Show')

// save all the data in database
// let data = require('../routes/data') 
// for(let i of data) {
//     let newShow = new Show(i)
//     newShow.save()
// }

router.get('/', (req, res) => {
    Show.find({}, function (err, response) {
        res.send(response)
        console.log('Data sent')
    })
})

router.post('/filter', (req, res) => {
    let price = req.body.price
    let location = req.body.location
    let date = req.body.date
    Show.find({ currentPrice: { $lt: price }, timeCategory: date, locations: location }, function (err, response) {
        res.send(response)
    })
})


module.exports = router


