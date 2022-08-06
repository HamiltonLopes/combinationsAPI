import { ServerError } from "../err/errors.js"

export const badRequest = (error) => ({
  statusCode: 400,
  body: error
})

export const serverError = (error) => ({
  statusCode: 500,
  body: new ServerError(error)
})

export const ok = (data, statusCode) => ({
  statusCode: statusCode,
  body: data
})