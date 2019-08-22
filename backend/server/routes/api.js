const express = require('express')
const router = express.Router()
const request = require('request-promise')
const Show = require('../model/Show')
const translate = require('translate');
translate.engine = 'yandex';
const apiKey = 'AIzaSyCsiMgX17KlEQaJcxlshqgVQLYGgua4f5w'
let data = require('../routes/data')


// save all the data in database
// async function loadData () {
//     for (let i of data) {
//         let newShow = new Show(i)
//         newShow.save()
//     }
// }

// loadData().then(response => {
    // Show.find({}, function (error, res) {
    //     for (let j of res) {
    //         if (j.youtubeVideoId == '') {
    //             translate(j.name,
    //                 { from: 'he', to: 'en', engine: 'yandex', key: 'trnsl.1.1.20190821T090657Z.3db80ca875d9cd52.80084d1a4ebc498961c4eb0b8a1d26274dde85f2' })
    //                 .then(text => {
    //                     request.get(`https://www.googleapis.com/youtube/v3/search?part=snippet&q=${text}&key=${apiKey}`).then(response => {
    //                         let audioData = JSON.parse(response).items
    //                         for (let i of audioData) {
    //                             if (i.id.videoId) {
    //                                 let videoId = i.id.videoId
    //                                 Show.findOneAndUpdate({ name: j.name }, { youtubeVideoId: videoId }, { new: true }, function (err, response) {
    //                                     return
    //                                 })
    //                                 break;
    //                             }
    //                             else {
    //                                 console.log('Do not find videoId')
    //                             }
    //                         }
    //                     })
    //                 });
    //         }
    //     }
    // })
// })


router.get('/', (req, res) => {
    Show.find({}, function (err, response) {
        res.send(response)
    })
})

router.put('/payment/:name/:tickets', (req, res) => {
    let name = req.params.name
    let tickets = req.params.tickets
    Show.findOneAndUpdate({ name: name }, { amountLeft: tickets - 1 }, { new: true }, function (err, response) {
        return
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


