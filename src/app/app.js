import  { readFile } from 'fs/promises';
import express, { Router } from 'express';
import Routes from './router.js';
import bodyParser from 'body-parser';
import cors from 'cors';
import swagger from 'swagger-ui-express';
const apiSchema = JSON.parse( await readFile(new URL("../api.schema.json", import.meta.url)));

export class App {
    constructor(){
      this.url = process.env.URL
      this.port = process.env.PORT
      this.appName = process.env.API_NAME
      this.version = process.env.API_VERSION
    }

    async init () {
      this.server = express();
      this.middlewares();
      this.routes();
      this.docsSetup()
    }
    
    middlewares(){
        this.server.use(bodyParser.json());
        this.server.use(bodyParser.urlencoded({ extended: false }));
        this.server.use(cors());
    }

    async docsSetup () {
      this.server.use(`/${this.appName}/${this.version}/docs`, swagger.serveFiles(apiSchema), swagger.setup(apiSchema));
    }

    routes(){
        this.server.use(new Router().get('/', (req,res)=> res.status(200).json({"AWS CONFIG":"OK"})));
        this.server.use(`/${process.env.API_NAME}/${process.env.API_VERSION}`,Routes);
    }

    start () {
      this.server.listen( this.port, () => console.log(`[TRAVELLOG-🐘] Server runing on http://${this.url}:${this.port}/${this.appName}/${this.version}`))
    }
} 



/*
 App.listen(process.env.PORT, 
//     () => console.log(`Server runing on http://${process.env.URL}:${process.env.PORT}/${process.env.API_NAME}/${process.env.API_VERSION}`))
*/