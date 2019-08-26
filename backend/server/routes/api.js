const express = require('express')
const router = express.Router()
const request = require('request-promise')
const Show = require('../model/Show')
const translate = require('translate');
translate.engine = 'yandex';
const apiKey = 'AIzaSyBrxb-nSV0JL1UtoxXtbLIHFuE4p3EnliY'
let axios = require('axios')
var gis = require('g-i-s');


async function filterDataBeforeInsert() {
    Show.find({}, async function (err, response) {
        for (let i of response) {
            await i.remove()
        }
    })
    insertDataToDB().then(response => {
        Show.find({}, async function (error, res) {
            for (let j of res) {
                await gis(`הופעה ${j.name}`, function (err, results) {
                    const pic = JSON.stringify(results[1].url, null, '  ')
                    let currectLink = pic.slice(1, pic.length - 1)
                    Show.findOneAndUpdate({ name: j.name }, { image: currectLink }, { new: true }, function (err, response) {
                        return
                    })
                });
                if (j.youtubeVideoId == '') {
                    // console.log(j)
                    translate(j.name,
                        { from: 'he', to: 'en', engine: 'yandex', key: 'trnsl.1.1.20190821T090657Z.3db80ca875d9cd52.80084d1a4ebc498961c4eb0b8a1d26274dde85f2' })
                        .then(text => {
                            request.get(`https://www.googleapis.com/youtube/v3/search?part=snippet&q=${text}&key=${apiKey}`).then(response => {
                                let audioData = JSON.parse(response).items
                                for (let i of audioData) {
                                    if (i.id.videoId) {
                                        let videoId = i.id.videoId
                                        Show.findOneAndUpdate({ name: j.name }, { youtubeVideoId: videoId }, { new: true }, function (err, response) {
                                            return
                                        })
                                        break;
                                    }
                                    else {
                                        console.log('Do not find videoId')
                                    }
                                }
                            })
                        })
                }
            }
        })
    })
}

async function insertDataToDB() {
    let a = await axios.get("http://catalogs.hulyo.co.il/catalogs/Production/Events/v1.0/eventsCatalog.js")
    const dataArray = a.data.items.filter(i => {
        if (i.category.includes('music')) {
            return i
        }
    })
    for (let i of dataArray) {
        let newShow = new Show(i)
        await newShow.save()
    }
}


//first insert shows to DB
filterDataBeforeInsert()
//insert shows to DB each 4 hours
setInterval(filterDataBeforeInsert, 14400000);


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