const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../../.env') });
const express = require('express');
const process = require('process');

const { database } = require('../database');
const { indexRouter } = require('./routes');


async function initApplication(){
    await database.init();
    const app = express();
    const port = 8080;

    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use('/', indexRouter);


    let server = app.listen(port, () => console.log(`Listening at http://localhost:${port}`));
    process.on('SIGINT', () => {
        server.close();
        database.close();
    });
}

initApplication();
