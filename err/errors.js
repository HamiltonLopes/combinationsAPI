export class ServerError extends Error {
  constructor ( error ) {
    super(`Somenthing wents wrong with the client`)
    this.name = 'ServerError'
    this.error = error
  }
}

export class RequestError extends Error {
  constructor ( error ) {
    super(`Somenthing wents wrong with the Request of application`)
    this.name = 'RequestError'
    this.error = error
  }
}


