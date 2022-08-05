import { RequestError, ServerError } from '../presentation/err/errors.js'
import * as HttpUtil from '../utils/request.js'



/*
  CLIENT CATALOG IMPLEMENTATION | Acessa a API de catologo vtex
*/

 export class Catalog {
  constructor ( request = new HttpUtil.Request()) {
    this.request = request
    this.appKey = process.env.X_VTEX_API_APP_KEY 
    this.appToken = process.env.X_VTEX_API_APP_TOKEN
    this.accountName = process.env.ACCOUNT_NAME
    this.environment = process.env.ENVIROMENT

  }

  async  getDataById ( id ) {
    try{
      const response = await this.request.get (
        `https://${this.accountName}.${this.environment}.com/api/catalog_system/pub/products/variations/${id}`,
        {
          headers: 
          {
            "Accept": "application/json",
            "Content-Type": "application/json",
            "X-VTEX-API-AppKey": this.appKey,
            "X-VTEX-API-AppToken": this.appToken
          }
        }
      )
      console.log(JSON.stringify(response.data))
      return  response.data

    } catch (error) {
      const err = this.request.isRequestError(error)
      if ( err ) 
        throw  new RequestError( error )
      
      throw new ServerError( error )
    }

  }

  async normalizeData () {} // possível método privado para moldar os dados 
}




