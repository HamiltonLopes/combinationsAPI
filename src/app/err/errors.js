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

export class NotFoundError extends Error {
  constructor ( error ) {
    super("Sorry, Not Found")
    this.name = 'NotFoundError'
    this.error = error
  }
}

export class MissingParamError extends Error {
  constructor ( error ) {
    super()
    this.name = 'MissingParamError'
    this.error = error
  }
}