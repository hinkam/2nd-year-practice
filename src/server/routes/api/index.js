const express = require('express');
const path = require('path');

const { generateID, generatePassword, saveAsPng, base64Encode } = require('../../../utils');
const { database } = require('../../../database');

const LIVE_TIME = 20 * 60 * 1000;
const ACCESS_COUNT = 3; // TODO: change to 20
const apiRouter = new express.Router();

apiRouter.get('/', (req, res) => {
    res.send('{"version": "1.0.0"}');
});

apiRouter.post('/print', (req, res) => {
    res.sendStatus(200);
});

apiRouter.post('/image/create', async (req, res) => {
    const userText = req.body['userText'];
    if (userText !== ''){
        const imageID = generateID();
        const imagePw = generatePassword();
        await saveAsPng(userText, imageID);
        await database.insertNewToken(imageID, imagePw);
        res.json({ imageID, imagePw });
    } else {
        res.json({imageID: null, imagePw: null});
    }
});

apiRouter.get('/image/check', async (req, res) => {
    const dbImageInfo = await database.getInfo(req.query.imageID);
    const isAccessable = (new Date(dbImageInfo.creation_datetime.getTime() + LIVE_TIME) > (new Date())) && (dbImageInfo.access_count < ACCESS_COUNT);
    res.json({ isAccessable });
});

apiRouter.get('/image/get', async (req, res) => {
    let isCorrectPassword = await database.isCorrectPassword(req.query.imageID, req.query.password);
    if (isCorrectPassword) {
        await database.incrAccessCount(req.query.imageID);
        let accessCount = (await database.getInfo(req.query.imageID)).access_count;
        let image64 = await base64Encode(path.resolve(__dirname, `../../../../data/${req.query.imageID}.png`));
        res.json({ isCorrectPassword, image64, accessCount });
    }
    else {
        res.json({ isCorrectPassword, image64: null, accessCount: null });
    }
});

module.exports = { apiRouter };
