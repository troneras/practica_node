'use strict';

require('dotenv').config();
const mongoose = require('mongoose');
const conn = mongoose.connection;

mongoose.Promise = global.Promise;

conn.on('error', err => {
    console.log('Error!', err);
    process.exit(1);
});

conn.once('open', () => {
    console.log(`Conectado a MongoDB en ${mongoose.connection.name}`);
});


mongoose.connect(process.env.DDBB_URL +'/'+process.env.DDBB_NAME, {
    useMongoClient: true
});

module.exports = conn;