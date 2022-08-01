import express, { Router } from 'express';
import Routes from './router.js';
import bodyParser from 'body-parser';
import https from 'https';
import fs from 'fs';

class App {
    constructor() {
        this.server = express();
        this.middlewares();
        this.routes();
        this.https();
    }
    
    middlewares() {
        this.server.use(bodyParser.json());
        this.server.use(bodyParser.urlencoded({ extended: false }));
    }

    routes() {
        this.server.use(new Router().get('/', (_, res)=> res.status(200).json({ 'AWS CONFIG': 'OK', 'Server': 'Now using https...' })));
        this.server.use(`/${process.env.API_NAME}/${process.env.API_VERSION}`, Routes);
    }

    https() {
        const key = fs.readFileSync(process.env.KEY);
        const cert = fs.readFileSync(process.env.CERT);

        const options = {
            key: key,
            cert: cert
        };

        this.https = https.createServer(options, this.server);
    }
} 

export default new App().https;
