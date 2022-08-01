import {ServicesCombinations} from '../services/services-combinations.js'

export class ControllerTopCombinations {
  static async handle (req, res) {
    try {
    /*
      Athozirar o uso da rota  por meio de 
      email, token ou status da sessão ?
    */ 

    // Access Services to get topCombinations
    const combinations = new ServicesCombinations()
    const {topN} = await combinations.getStoreTopCombinantions(1)
    return res.status(200).json(topN)

    } catch (error) {
      console.log(error)
    }
  }
}


