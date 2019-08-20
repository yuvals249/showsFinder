const express = require('express')
const router = express.Router()
const request = require('request-promise')
const Show = require('../model/Show')
const apiKey = 'AIzaSyCP-CH_oc8w_eAgbSFTOVphBrCY0OzFGwc'

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

// router.get('/:name', async (req, res) => {
//     let name = req.params.name
//     console.log(name)
//     let response = await request.get(`https://www.googleapis.com/youtube/v3/search?part=snippet&q=caveret&key=AIzaSyCP-CH_oc8w_eAgbSFTOVphBrCY0OzFGwc`)
//     response = JSON.parse(response)
//     console.log(response.items[0])
// })


router.post('/filter', (req, res) => {
    let price = req.body.price
    let location = req.body.location
    let date = req.body.date
    Show.find({ currentPrice: { $lt: price }, timeCategory: date, locations: location }, function (err, response) {
        res.send(response)
    })
})


module.exports = router


