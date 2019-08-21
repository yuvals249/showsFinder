const express = require('express')
const router = express.Router()
const request = require('request-promise')
const Show = require('../model/Show')
const translate = require('translate');
translate.engine = 'yandex';
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

router.put(`/:name`, (req,res) => {
    let name = req.params.name
    translate(name,
        { from: 'he', to: 'en', engine: 'yandex', key: 'trnsl.1.1.20190821T090657Z.3db80ca875d9cd52.80084d1a4ebc498961c4eb0b8a1d26274dde85f2' })
        .then(text => {
            request.get(`https://www.googleapis.com/youtube/v3/search?part=snippet&q=${text}&key=${apiKey}`).then(response => {
            let audioData = JSON.parse(response).items
            for (let i of audioData) {
                if (i.id.videoId) {
                    let videoId = i.id.videoId
                    console.log(videoId)
                    Show.findOneAndUpdate({name: name}, {youtubeVideoId: videoId}, {new: true}, function (err, response) {
                        return
                    })
                    break;
                }
                else {
                    console.log('Do not find videoId')
                }
            }
            })
        });
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


