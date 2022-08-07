import {ServicesCombinations} from '../../services/services-combinations.js'
import { serverError } from '../helpers/helpers-http.js'

export class ControllerRawTopCombinations {
  static async handle (req, res) {
    try {
      
      const combinations = new ServicesCombinations()
      const rowTopsCombinations = await combinations.getRawStoreTopCombinantions()
      return res.status(200).json(rowTopsCombinations)

    } catch (error) {
      console.log(error)
      res.status(500).json(serverError(error))
    }
  }
}
