import { Db } from '../clients/index.js'
import { NotFoundError, InvalidTopRanking} from '../err/errors.js'
import { storeTopCombinations, getUniqueValues, mapStoreTopCombinations } from './protocols/store-top-combinations.js'
import { topCombinationsStub } from '../../../fixtures/db-fixtures.js'
/*
  - Acessa o Db | MasterData
  - Verifica a existência do id
  - Chama o Catalog 
  - Retorna um array com as infos dos produtos que tiveram melhores combinações 
*/

export class ServicesCombinations {

  async getById ( productId ) {
    const retrieve = []

    const db = new Db()
    const { combinations } = await db.getDocByFields()
    combinations
    if ( !combinations[productId] ) {
      throw new NotFoundError()
    } 

    const product = combinations[productId]
    for (let i in product.combinations ) {
      const [ key ] = Object.getOwnPropertyNames(product.combinations[i])
      retrieve.push(key)
    } 

    let message
    retrieve.length > 0 ? retrieve : message = { message: "There are no combinations for this product"}
    console.log(retrieve)
    return retrieve;
  }

  async getStoreTopCombinantions (wishNumber) {
    
      const db = new Db()
      const {topCombinations} = await db.getDocByFields()
  
      const { maxPositions, topValues } = getUniqueValues(topCombinations) 
  
      // comparar maxPositions com número de tops desejado
      if( wishNumber > maxPositions ) {
          throw new InvalidTopRanking(maxPositions)
      } 
  
      const positions = wishNumber || maxPositions
  
      const { topN } = await storeTopCombinations(positions, topCombinations)
      const topMapped = await mapStoreTopCombinations( topN )
  
      topMapped["qty"] = topValues
  
      return { topN, topMapped }
  }
}





    