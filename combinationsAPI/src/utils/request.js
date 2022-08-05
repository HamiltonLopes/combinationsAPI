import axios from 'axios';
import  AxiosError from 'axios' 

/*
  INSTANCE AXIOS 
*/

export class Request {
  constructor( request = axios) { this.request = request }

  get (url, config = {} ) {
    return this.request.get(url, config);
  }

  post ( url, data, config = {}  ) {
    return this.request.post(url, data, config);
  }

  delete (url, config = {} ) {
    return this.request.delete(url, config);
  }

  isRequestError ( error ) {
    let requesError;
    error instanceof AxiosError ? requesError = 1 : requesError = 0 

    return requesError;
  }
}

