const {Schema, model} = require("mongoose");

const currentDate = new Date();

const year = currentDate.getFullYear();
const month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
const day = currentDate.getDate().toString().padStart(2, '0');


const dateOnly = `${month}.${day}.${year}`;

const CommentsModel = new Schema({
    author: {
        type: String,
        default: ''
    },
    avatar: {
        type: String,
        default: ''
    },
    message: {
        type: String,
        default: '',
        required: true
    },
    date: {
        type: String,
        default: dateOnly
    }
})

const WebsiteSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    fileImg: {
        type: String,
        required: true
    },
    fileUpload: {
        type: String,
        required: true
    },
    siteType: {
        type: String,
        required: true
    },
    views: {
        type: Number,
        default: 0
    },
    saves: {
        type: Number,
        default: 0
    },
    commentsNumber: {
        type: Number,
        default: 0
    },
    likes: {
        type: Number,
        default: 0
    },
    date: {
        type: String,
        default: dateOnly
    },
    comments: {
        type: [CommentsModel],
        default: [],
    }
});

const WebsitesModel = model('website', WebsiteSchema);

module.exports = {WebsitesModel}