import { maketopN } from './index.js'

/*
  Logic to map the return of StoreTopCombinations Method
*/
export const mapStoreTopCombinations = async (unmappedData, wishNumber) => {
  let obj = unmappedData
  const properties = Object.keys(obj)
  const { topN } = maketopN(properties)
  //const topN = {1: [], 2: [], 3: []}
  let size =  wishNumber || properties.length
  for (let i = 1; i <= size ; i++ ) {
    topN[i] = []
    if(obj[i] !== undefined)
      obj[i].map((obj) => { 
        const[[key, value]] = Object.entries(obj) 
        let mapped = { [key]: Number(key), [value]: Number(value) }
        topN[i].push(mapped)
      })
  }
  return topN
}