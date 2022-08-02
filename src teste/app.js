import express, { Router } from 'express';
import Routes from './router.js';
import bodyParser from 'body-parser';
import https from 'https';
import fs from 'fs';
// import nodeStatic from 'node-static';

class App {
    constructor() {
        this.server = express();
        this.middlewares();
        this.routes();
        // this.https();
    }
    
    middlewares() {
        this.server.use(bodyParser.json());
        this.server.use(bodyParser.urlencoded({ extended: false }));
    }

    routes() {
        this.server.use(new Router().get('/', (_, res)=> res.status(200).json({ 'AWS CONFIG': 'OK', 'Server': 'Now using https...' })));
        this.server.use(`/${process.env.API_NAME}/${process.env.API_VERSION}`, Routes);
    }

    // https() {
    //     const key = fs.readFileSync('../certs/localhost.key');
    //     const crt = fs.readFileSync('../certs/localhost.crt');
    //     // const csr = fs.readFileSync('./certs/test.csr');

    //     // const file = new (nodeStatic.Server)();

    //     const options = {
    //         key: key,
    //         // ca: csr,
    //         cert: crt,
    //         // hostname: "localhost",
    //         // requestCert: false,
    //         // rejectUnauthorized: false
    //     };

    //     this.https = https.createServer(options, this.server);
    //     // this.https = https.createServer(options, function (req, res) {file.serve(req, res)});
    // }
} 

export default new App().server;
