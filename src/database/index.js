const { Client } = require('pg');

class Database {
    constructor(){
        this.connection = new Client({
            user: process.env.PGUSER,
            host: process.env.PGHOST,
            database: process.env.PGDATABASE,
            password: process.env.PGPASSWORD,
            port: process.env.PGPORT
        });
    }

    async init(){
        await this.connection.connect();
        await this.createTableIfNotExists();
    }

    async createTableIfNotExists() {
        await this.connection.query(
            `CREATE TABLE IF NOT EXISTS Images (
                image_ID CHAR(16) NOT NULL PRIMARY KEY,
                image_password CHAR(16),
                creation_datetime TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                access_count INT DEFAULT 0
            )`
        );
    }

    async insertNewToken(imageID, imagePw){
        await this.connection.query(
            `INSERT INTO Images (image_ID, image_password) VALUES('${imageID}', '${imagePw}')`
        );
    }

    async incrAccessCount(imageID){
        await this.connection.query(
            `UPDATE Images
            SET access_count = access_count+1
            WHERE image_ID = '${imageID}'`
        );
    }

    async isCorrectPassword(imageID, imagePw){
        return (imagePw == (await this.connection.query(`SELECT image_password FROM Images WHERE image_ID = '${imageID}'`)).rows[0].image_password);
    }

    async getInfo(imageID){
        return (await this.connection.query(`SELECT creation_datetime, access_count FROM Images WHERE image_ID = '${imageID}'`)).rows[0];
    }

    async close(){
        await this.connection.end();
    }
}

const database = new Database();

module.exports = { database };
