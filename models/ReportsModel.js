const { Schema, model } = require("mongoose");

const currentDate = new Date();

const year = currentDate.getFullYear();
const month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
const day = currentDate.getDate().toString().padStart(2, '0');

const dateOnly = `${month}.${day}.${year}`;

const reportsSchema = new Schema({
    name: {
        type: String
    },
    voted: {
        type: String
    },
    reason: {
        type: String
    },
    date: {
        type: String,
        default: dateOnly
    }
});

const ReportsModel = model('reports', reportsSchema);

module.exports = { ReportsModel };
