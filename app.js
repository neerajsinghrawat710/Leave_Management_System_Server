const express = require("express");
const helmet = require("helmet");
const cors = require('cors')
const mongoSanitize = require("express-mongo-sanitize");
const Route = require("./src/routes");

require('dotenv').config();

const app = express()

require('./src/config/database')


app.use(express.json());
app.use(helmet());
app.use(cors({ origin: '*' }));
app.use(mongoSanitize());

app.use(Route)


// 404 route
app.get('*', function (req, res) {
    res.status(400).json({
        status: 400,
        message: 'No Route Found.'
    })
});


module.exports = app