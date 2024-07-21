const {Schema, model} = require("mongoose");

const adminSchema = new Schema({
    vk: {
        type: String
    },
    discord: {
        type: String
    },
    instagram: {
        type: String
    },
    facebook: {
        type: String
    }
});

const AdminModel = model('admin', adminSchema);


module.exports = {AdminModel}