const {Schema, model} = require("mongoose");

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
    }
});

const WebsitesModel = model('website', WebsiteSchema);

module.exports = {WebsitesModel}