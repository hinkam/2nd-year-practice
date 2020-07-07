const express = require('express');
const path = require('path');

const { apiRouter } = require('./api/index.js');

const indexRouter = new express.Router();

indexRouter.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../../../dist/html/index.html'));
});

indexRouter.get('/image/:imageID', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../../../dist/html/image.html'));
});


indexRouter.use('/static', express.static(path.resolve(__dirname, '../../../dist')));

indexRouter.use('/api', apiRouter);

module.exports = { indexRouter };
