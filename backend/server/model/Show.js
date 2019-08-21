const mongoose = require('mongoose')
const Schema = mongoose.Schema

const showSchema = new Schema({
    address: String,
    amountLeft: Number,
    category: Array,
    currentPrice: Number,
    date: String,
    description: String,
    image: String,
    locations: Array,
    name: String,
    originalPrice: Number,
    priceCurrencySign: String,
    timeCategory: Array,
    youtubeVideoId: String,
    time1: String
})


const Show = mongoose.model('showSchema', showSchema)

module.exports = Show 
