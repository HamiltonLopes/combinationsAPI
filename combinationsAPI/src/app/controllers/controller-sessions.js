// import { ServicesCombinations } from '../services/services-combinations.js'
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export class ControllerSessions {
  static async handle (req, res) {
    try {
      const key = await bcrypt.hash(req.body.key, 8);

      if (!(await bcrypt.compare(process.env.X_VTEX_API_APP_KEY.toString(), key))) {
        return res.status(400).json({
            message: 'invalid key'
        });
      };

      const token = jwt.sign({ id: 'token' }, process.env.X_VTEX_API_APP_TOKEN, {
          expiresIn: 60
      });

      return res.status(200).json({
          message: 'key accepted',
          token
      })
    } catch (error) {
      console.log(error)
      res.status(500).json(error)
    }
  }
}
