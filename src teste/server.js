import App from './app.js';
import env from 'dotenv';

env.config();

App.listen(process.env.PORT, 
    () => console.log(`Server runing on https://${process.env.URL}:${process.env.PORT}/${process.env.API_NAME}/${process.env.API_VERSION}`));
