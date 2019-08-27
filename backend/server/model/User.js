const mongoose = require('mongoose')
const Schema = mongoose.Schema
const Show = require('./Show')


const userSchema = new Schema({
    name: String,
    email: String,
    password: String,
    bookmarks: Array,
    purchasedShows: Array
})


const User = mongoose.model('userSchema', userSchema)

module.exports = User