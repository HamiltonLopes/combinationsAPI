import { MissingParamError } from "../err/errors"
import { ServicesCombinations } from "../../services/services-combinations.js"

/*
  - Valida o parametro do request
  - Chamma o CombinationsServices
  - Retornar para o front o que eles precisarem
*/

export class ControllerCombinationsById {

  static async handle ( request, response ) {
    
    try {
      const combinations = new ServicesCombinations()

      const fields = ['ProductId']

      for (let field of fields ) { 
        if( !request.body[field] ) 
          return response.status(400).json(new MissingParamError())
        
      }  
  
      const { ProductId } = request.body
            
      const productsCombinations = await combinations.getById(ProductId)
      return response.status(200).json(productsCombinations)
  
    } catch (error) {
      console.log(error)
      response.status(500).send( { message: error.message })
    }

  }

}