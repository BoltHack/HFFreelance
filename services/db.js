const mongoose = require('mongoose');

const {MONGODB_URL} = process.env;

async function start(){
    try{
       await mongoose.connect(MONGODB_URL);
        console.log("База данных подключена...")
    }catch (e) {
        console.log(e)
    }
}

module.exports = start;

