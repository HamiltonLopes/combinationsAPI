import jwt from 'jsonwebtoken';
import { promisify } from 'util';

const Session = async (req, res, next) => {
    const authHeader = req.headers.authorization;
    
    if (!authHeader) {
        return res.status(400).json({
            message: 'no header'
        });
    };

    const [, token ] = authHeader.split(' ');
    if (!token) {
        return res.status(400).json({
            message: 'no token'
        });
    };
    
    try {
        const decode = await promisify(jwt.verify)(token, process.env.X_VTEX_API_APP_TOKEN);
        console.log(decode);
        req.userId = decode.id;
        return next();
    } catch {
        return res.status(400).json({
            message: 'invalid token'
        });
    };
};

export default Session;
