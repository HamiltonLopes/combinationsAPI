import { MissingParamError } from "../err/errors.js"
import { ServicesCombinations } from "../../services/services-combinations.js"
import { badRequest, serverError } from "../helpers/helpers-http.js"

/*
  - Valida o parametro do request
  - Chamma o CombinationsServices
  - Retornar para o front o que eles precisarem
*/

export class ControllerCombinationsById {

  static async handle ( request, response ) {
    
    try {
      const combinations = new ServicesCombinations()

      const { productId } = request.body 
      const productsCombinations = await combinations.getById(productId)
      return response.status(200).json(productsCombinations)
  
    } catch (error) {
      console.log(error)
      response.status(500).json(serverError(error))
    }

  }

}