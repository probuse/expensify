const express = require('express');
const bodyParser = require('body-parser');
const dbConfig = require('./config/database.config.js');
const mongoose = require('mongoose');

const app = express();
mongoose.Promise = global.Promise;

// connect to database
mongoose.connect(dbConfig.url).then(() => {
    console.log("Successfully connected to database");
}).catch(() => {
    console.log('Could not connect to the database, Exiting now...')
});

// parse requests of content-type -application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: true}));
// parse requests of content-type - application/json
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.json({'message': 'etwin once again'});
});

app.listen(3000, () => {
    console.log('Listening on port 3000....')
});