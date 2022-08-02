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

export class InvalidParamError extends Error {
  constructor ( param, error ) {
    super(`The param ${param} is invalid`)
    this.name = 'MissingParamError'
    this.error = error
  }
}

export class InvalidTopRanking extends Error {
  constructor (maxPositions) {
    super()
    this.name = "InvalidTopRanking"
    this.message = `Sorry, I can only return a top ${maxPositions} at most`
  }
}
  
