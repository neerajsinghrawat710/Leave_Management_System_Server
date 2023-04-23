const mongoose = require('mongoose')


mongoose.set('strictQuery', false)
// mongoose.set('debug', true);


const options = {
    autoIndex: false,
    connectTimeoutMS: 1000,
};

const db = mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true }, (err) => {
    if (err) throw err.message
    if (process.env.NODE_ENV == 'dev' || process.env.NODE_ENV == 'qa' || process.env.NODE_ENV == 'uat') {
        console.log("connected to database.")
    }

}, options)




module.exports = db