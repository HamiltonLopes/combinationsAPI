import { RequestError, ServerError } from '../err/errors.js'
import * as HttpUtil from '../utils/request.js'



/*
  DB IMPLEMENTATION | Acessa o Vtex MasterData 
*/

 export class Db {
  constructor ( request = new HttpUtil.Request()) {
    this.request = request
    this.appKey = process.env.X_VTEX_API_AppKey 
    this.appToken = process.env.X_VTEX_API_AppToken
    this.accountName = process.env.ACCOUNT_NAME
    this.environment = process.env.ENVIROMENT
    this.entityName = process.env.DATA_ENTITY_NAME
    this.docId = process.env.MASTERDATA_DOCUMENT_ID

  }

  async  getDocByFields () {
    try{
      const response = await this.request.get (
        `http://${this.accountName}.${this.environment}.com/api/dataentities/${this.entityName}/documents/${this.docId}?_fields=combinations,topCombinations`,
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
          
      return  response.data

    } catch (error) {
      const err = this.request.isRequestError(error)
      if ( err ) 
        throw  new RequestError( error )
      
      throw new ServerError( error )
    }

  }
}




