import { Catalog } from "../../clients/index.js"
import { MissingParamError } from "../../err/errors.js"

export const getCatalogItemById = async ( id = [] ) => {
  if (id.length <= 0) 
    return  new MissingParamError()

  const retrieve = []

  for (let i in id ) {
    const [ key ] = Object.getOwnPropertyNames(id[i])
    const catalog = new Catalog()

    const catalogItem = await catalog.getDataById(key)
    retrieve.push(catalogItem)
  }
  return retrieve
}

