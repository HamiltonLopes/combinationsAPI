import { Db } from '../infra/db.js'
import { GetOrder } from '../clients/index.js'
import { NotFoundError, InvalidTopRanking } from '../presentation/err/errors.js'
import { orderProcessorItems } from './protocols/order-processor-protocols/order-processor-items.js'
import { storeTopCombinations, getUniqueValues, mapStoreTopCombinations } from './protocols/store-top-combinations-protocols/index.js'
/*
  - Acessa o Db | MasterData
  - Verifica a existência do id
  - Chama o Catalog 
  - Retorna um array com as infos dos produtos que tiveram melhores combinações 
*/

export class ServicesCombinations {

  async getById(productId) {

    const retrieve = []

    const db = new Db()
    const { combinations } = await db.getDocByFields()

    if (!combinations[productId]) {
      return []
      //throw new NotFoundError()
    }

    const product = combinations[productId]
    let len = product[Object.keys(product)[0]].length

    if (len >= 4) {
      len = 3
    }

    for (let i = 0; i < len; i++) {
      const [key] = Object.entries(product.combinations[i])
      retrieve.push(key[1])
    }

    let message
    retrieve.length > 0 ? retrieve : message = { message: "There are no combinations for this product" }
    return retrieve;
  }

  async getStoreTopCombinantions (wishNumber) {
      const db = new Db()
      const {topCombinations} = await db.getDocByFields()
  
      const { maxPositions, topValues } = await getUniqueValues(topCombinations) 
      // comparar maxPositions com número de tops desejado
      if( wishNumber > maxPositions ) {
          throw new InvalidTopRanking(maxPositions)
      } 
      const { topN } = await storeTopCombinations(maxPositions, topCombinations)
      const topStore = await mapStoreTopCombinations( topN,  wishNumber)
      topStore["qty"] = topValues
  
      return { topStore }
  }

  async updateCombinations (OrderId) {

    /*
      ACCESS CLIENT ORDER ID 
    */    
      const getOrder = new GetOrder()
      const { items } = await getOrder.byId(OrderId);
    /*
      ACCESS CLIENT MASTERDATA [GET]
    */
      const  db = new Db()
      let { combinations, topCombinations } = await db.getDocByFields();
    /*
      ITEMS HANDLE FROM GET ORDER
    */
      await orderProcessorItems( items, combinations, topCombinations );  
    /*
      ACCESS CLIENT MASTERDATA [PATCH]
    */
      const status = await db.updateByDocId(combinations, topCombinations)
  
      if (status !== 204 )
        throw new Error(`Somethings wrong to update data, status: ${status}`)
    
    return status;
    }

    async getRawStoreTopCombinantions () {
      const db = new Db()
      const {topCombinations} = await db.getDocByFields()
  
      return topCombinations
  }
}





