import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import Session from './app/middlewares/Session.js';
import dotenv from 'dotenv';
dotenv.config();

const app = express();
app.use(express.json());

app.get('/', async (_, res) => {
    return res.json('teste');
});

app.get('/check', Session, async (_, res) => {
    return res.json({
        message: 'passou!'
    });
});

app.post('/session', async (req, res) => {
    const key = await bcrypt.hash(req.body.key, 8);

    // if (req.body.key !== 'chave') {
    //     return res.status(400).json({
    //         erro: true,
    //         message: 'invalid key'
    //     });
    // };

    // console.log(process.env.X_VTEX_API_AppKey);

    if (!(await bcrypt.compare(process.env.X_VTEX_API_AppKey.toString(), key))) {
        return res.status(400).json({
            message: 'invalid key'
        });
    };

    const token = jwt.sign({ id: 'token' }, process.env.X_VTEX_API_AppToken, {
        expiresIn: 60
    });

    return res.json({
        message: 'key accepted',
        token
    })
});

app.listen(3001, () => {
    console.log('server runing...')
})
