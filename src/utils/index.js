let fs = require('fs');
let text2png = require('text2png');
const path = require('path');

function generateRandomString(){
    return (Math.random().toString(36).substring(2, 10) + Math.random().toString(36).substring(2, 10));
}

function generateID(){
    return generateRandomString();
}

function generatePassword(){
    return generateRandomString();
}

async function base64Encode(file) {
    return new Promise((resolve) => {
        fs.readFile(file, 'base64', (err, fileData) => { resolve(fileData); });
    });
}

async function saveAsPng(userText, imageID){
    return new Promise((resolve) => {
        fs.writeFile(path.resolve(__dirname, `../../data/${imageID}.png`), text2png(userText), () => { resolve(); });
    });
}

module.exports = { generateID, generatePassword, saveAsPng, base64Encode };
