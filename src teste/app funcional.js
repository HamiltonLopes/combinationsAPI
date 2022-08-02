import express from 'express';
import https from 'https';
import fs from 'fs';
import env from 'dotenv';

env.config();

const server = express();

const key = fs.readFileSync(process.env.KEY);
const cert = fs.readFileSync(process.env.CERT);

const options = {
  key: key,
  cert: cert
};

server.get('/', (_, res) => {
    res.status(200).json({ 'AWS CONFIG': 'OK', 'Server': 'Now using https...' });
  });

const App = https.createServer(options, server);

export default App;
