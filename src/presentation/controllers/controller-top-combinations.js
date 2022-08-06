import {ServicesCombinations} from '../../services/services-combinations.js'
import { serverError } from '../helpers/helpers-http.js'

export class ControllerTopCombinations {
  static async handle (req, res) {
    try {
      const { top } = req.body
      const combinations = new ServicesCombinations()
      const topsCombinationsOfStore = await combinations.getStoreTopCombinantions(top)
      return res.status(200).json(topsCombinationsOfStore)

    } catch (error) {
      console.log(error)
      res.status(500).json(serverError(error))
    }
  }
}


