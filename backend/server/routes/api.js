const express = require('express')
const router = express.Router()
const request = require('request-promise')
const Show = require('../model/Show')
const User = require('../model/User')
const translate = require('translate');
translate.engine = 'yandex';
const apiKey = 'AIzaSyCGWtIvgmg591qoFrD9purXMv9ShSQ1iAk'
let axios = require('axios')
const gis = require('g-i-s');
const nodemailer = require('nodemailer');


async function filterDataBeforeInsert() {
    Show.find({}, async function (err, response) {
        for (let i of response) {
            await i.remove()
        }
    })
    // User.find({}, async function (err, response) {
    //     for (let i of response) {
    //         i.bookmarks = []
    //     }
    // })
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
        // const showsArray = []
        // Show.find({}, function (err, response) {
        //     for (let i of response) {
        //         let name = i.name
        //         showsArray.push({[name]: false})
        //     }
        // })
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
    User.find({ email: email }, function (err, response) {
        response[0].purchasedShows.push(name)
        response[0].save()
        res.send(response[0].purchasedShows)
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
    user.bookmarks = []
    user.purchasedShows = []
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
router.put('/userProfileAdd/:name/:email', (req, res) => {
    let showName = req.params.name
    let userEmail = req.params.email
    User.find({ email: userEmail }, function (err, response) {
        response[0].bookmarks.push(showName)
        // console.log(response[0])
        response[0].save()
    })
    res.end()
})


//remove from bookmarks
router.put('/userProfileRemove/:name/:email', (req, res) => {
    let showName = req.params.name
    let userEmail = req.params.email
    User.find({ email: userEmail }, function (err, response) {
        for (let i in response[0].bookmarks) {
            if (response[0].bookmarks[i] === showName) {
                response[0].bookmarks.splice(i, 1)
                response[0].save()
            }
        }
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



//get bookmarks array for each user
// router.get('/myProfile/:email', (req, res) => {
//     let email = req.params.email
//     let bookmarksObj = {}
//     User.find({ email: email }, function (err, response) {
//         const bookmarks = response[0].bookmarks
//         console.log(bookmarks)
//         for (let i of bookmarks) {
//             Show.find({name: 'באושר ועושר - שי אביבי ומיכל ליבדינסקי'}, function (err,showResponse) {
//                 console.log(showResponse[0])
//                 // bookmarksObj[showResponse[0].name] = showResponse[0]
//                 // console.log(bookmarksObj)
//             })
//         }
//         res.send(bookmarksObj)
//     })
// })

module.exports = router