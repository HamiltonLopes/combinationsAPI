import { RequestError, ServerError } from '../err/errors'
import * as HttpUtil from '../utils/request'

/*
  HOOK CONFIG FACTORY
*/
const makeHookConfig = (endPoint, endPointKey) => ({
  filter: {
    type: "FromWorkflow",
    status: ["order-completed", "handling", "ready-for-handling", "waiting-ffmt-authorization", "cancel"]
  },
  hook: {
      url: endPoint,
      headers: {
          key: endPointKey
      }
  }
})

/*
  CLIENT VTEX HOOK IMPLEMENTATION
  question: exportar como um singleton ?
*/

 class VtexHook {
  constructor ( request = new HttpUtil.Request()) {
    this.request = request
    this.appKey // process.env.APP_KEY
    this.appToken // process.env.APP_TOKEN
    this.accountName // process.env.ACCOUNT_NAME || any string 
    this.environment // process.env.ENVIRONMENT  || any string  
    this.endPoint // process.env.END_POINT       || any string
    this.endPointKey // process.env.END_POINT_KEY 
  }

  async fetchPostConfig ()  {
    try {
      const response =  await this.request.post(
        `https://${this.accountName}.${this.environment}.com.br/api/orders/hook/config`, makeHookConfig(this.endPoint, this.endPointKey), {

          headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
            "X-VTEX-API-AppKey": this.appKey,
            "X-VTEX-API-AppToken": this.appToken
          } 
        });
  
      if (response.status == 200) //console.log({ "Config": "Successful" })
        return { status: response.status } 
        
    } catch (error) {
      const err = this.request.isRequestError(error)
      //console.log( error )
      if ( err ) 
        throw  new RequestError( error )
      
      throw new ServerError( error )
    }

  }

  async fetchGetConfig () {
    try{
      const response = await this.request.get (
        `https://${this.accountName}.${this.environment}.com.br/api/orders/hook/config`,
        {
          headers: 
          {
            "Accept": "application/json",
            "X-VTEX-API-AppKey": this.appKey,
            "X-VTEX-API-AppToken": this.appToken
          }
        }
      )
      return response.data  
      
    } catch (error) {
      const err = this.request.isRequestError(error)
      //console.log( error )
      if ( err ) 
        throw  new RequestError( error )
      
      throw new ServerError( error )
    }

  }

  async fetchDeleteConfig () {
    try{
      const response = await this.request.delete (
        `https://${this.accountName}.${this.environment}.com.br/api/orders/hook/config`,
        {
          headers: 
          {
            "Accept": "application/json",
            "X-VTEX-API-AppKey": this.appKey,
            "X-VTEX-API-AppToken": this.appToken
          }
        }
      )
      
      if (response.status === 200 )
        return { statusCode: response.status,  message: "Config deleted successfully !"}

    } catch (error) {
      const err = this.request.isRequestError(error)
      //console.log( error )
      if ( err ) 
        throw  new RequestError( error )
      
      throw new ServerError( error )
    }

  }
  
}

