let mongoose = require("mongoose")
const Schema = mongoose.Schema

const PostSchema = Schema({
    title:String,
    author: String,
    post_date: {
        type: Date, 
        default: Date.now
    },
    post_data: String
});

module.exports = mongoose.model('posts', PostSchema)