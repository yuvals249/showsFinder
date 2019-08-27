const express = require('express')
const router = express.Router()
const request = require('request-promise')
const Show = require('../model/Show')
const User = require('../model/User')
const translate = require('translate');
translate.engine = 'yandex';
const apiKey = 'AIzaSyBrxb-nSV0JL1UtoxXtbLIHFuE4p3EnliY'
let axios = require('axios')
const gis = require('g-i-s');
const nodemailer = require('nodemailer');


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

// purchase confirmation
router.put('/payment/:name/:tickets/:email', (req, res) => {
    let name = req.params.name
    let tickets = req.params.tickets
    let email = req.params.email
    Show.findOneAndUpdate({ name: name }, { amountLeft: tickets - 1 }, { new: true }, function (err, response) {
        let show = response
        sendEmail(show, 'purchaseConfirmation', email)
    })
    User.find({ email: userEmail }, function (err, response) {
        response.purchasedShows.push(name)
        response.save()
        res.end()
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




//insert new user
router.post('/newUser', (req, res) => {
    let user = req.body
    user.bookmarks = null
    user.purchasedShows = null
    let newUser = new User(user)
    newUser.save()
    sendEmail(user, 'registration')
    res.end()
})

//check if the user exist
router.get('/user/:email/:password', (req, res) => {
    let email = req.params.email
    let password = req.params.password
    User.find({ email: email, password: password }, function (err, response) {
        if (response !== []) {
            res.send(response)
        }
        else {
            res.send(err)
        }
    })
})

//send user info 
router.get('/userInfo/:email', (req, res) => {
    let email = req.params.email
    User.find({ email: email }, function (err, response) {
        res.send(response)
    })
})

//add show to bookmarks
router.put('/userProfile/:name/:email', (req, res) => {
    let showName = req.params.name
    let userEmail = req.params.email
    User.find({ email: userEmail }, function (err, response) {
        response.bookmarks.push(showName)
        response.save()
        res.end()
    })
})

//send email function
function sendEmail(obj, subject, email) {
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'showsfinder50@gmail.com',
            pass: 'q1!w2@e3#'
        }
    });

    if (subject === 'registration') {
        let mailOptions = {
            from: 'showsfinder50@gmail.com',
            to: obj.email,
            subject: 'Welcome to ShowsFinder!',
            text: `Thank you for signing up for our website, ${obj.name}. We hope you find it usefull.
                   Your password is: ${obj.password}`
        };
        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(error);
            } else {
                console.log('Email sent: ' + info.response);
            }
        });
    }
    else {
        let mailOptions = {
            from: 'showsfinder50@gmail.com',
            to: email,
            subject: 'Thank you for buying with our website, Enjoy the show!',
            text: `Enjoy ${obj.name} at ${obj.address}.
                   The show will start at ${obj.date}, ${obj.time1}`
        };
        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(error);
            } else {
                console.log('Email sent: ' + info.response);
            }
        });
    }
}




module.exports = router