import express from 'express';
import https from 'https';
import fs from 'fs';

const app = express();

const port = 3000;
const key = fs.readFileSync('./cert/key.pem');
const cert = fs.readFileSync('./cert/cert.pem');

const options = {
  key: key,
  cert: cert
};

app.get('/', (_, res) => {
   res.send('Now using https...');
});

const server = https.createServer(options, app);

server.listen(port, () => {
  console.log('server starting on port: ' + port)
});
