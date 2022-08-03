import { RequestError, ServerError } from '../app/err/errors.js'
import * as HttpUtil from '../app/utils/request.js'



/*
  DB IMPLEMENTATION | Acessa o Vtex MasterData 
*/

 export class Db {
  constructor ( request = new HttpUtil.Request()) {
    this.request = request
    this.appKey = 'vtexappkey-travellog-ATKHOZ' 
    this.appToken = 'IEBZJYKGDLJJFVKGXZMLGLVNJBWIQHOQZDFVQHHAQITNAXPPRFBITVJJAACBEKJFJDRVWOPUVXAJHBGWIDRKZICVIPQMTZGSTRPNALZGMPKKQAMCTCTJTMJMCMATAZVI'
    this.accountName = 'travellog'
    this.environment = 'myvtex'
    this.entityName = 'TravellogHouse'
    this.docId = "9a67657d-12c3-11ed-835d-120603e61087"//"aa4b2338-12bf-11ed-835d-125d56d9114d" //"bff42428-12bb-11ed-835d-124dabe2fa6f" //"50ba98f7-12bb-11ed-835d-12cb01f00d79"// 'b83f32d6-0f6c-11ed-835d-0e5c6c9bc771'//"24254e6a-11a3-11ed-835d-0217339c0b11" "bff42428-12bb-11ed-835d-124dabe2fa6f"  

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




