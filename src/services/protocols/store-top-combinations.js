import { topCombinationsStub } from "../../../../fixtures/db-fixtures.js"
import { InvalidParamError } from "../../err/errors.js"


/*
  TopN Object Factory
*/
export const maketopN = (n) => {
  const topN= {}
  for (let i = 1 ; i <= n; i++) {
    topN[i] = (topN[i] || [] ) 
  }
  return { topN }
}

/*
  Logic to get Top Combinations of Store 
*/
export const storeTopCombinations = async (maxPositions, topCombinations ) => {
  
    const { topN } =  maketopN(maxPositions) 

    let k = 1
    let i = 0 
    let j = 1;
  
    const arrSize = topCombinations.length -1
    let rightKey
    let leftKey 
  
    if (!Array.isArray(topCombinations) || topCombinations.length === 0 ) {
      throw new InvalidParamError('array topCombinations')
    }
  
    leftKey = Object.keys(topCombinations[i])[0]

    if (topCombinations.length <= 1 && topCombinations[i] !== undefined) {
      topN[k].push(topCombinations[i][leftKey])

    } else {
      for ( ; j < topCombinations.length  ; j++) { 
        leftKey = Object.keys(topCombinations[i])[0]
        rightKey = Object.keys(topCombinations[j])[0]
        
    
        // Caso-1
        if ( leftKey === rightKey ) { 
          if (j === arrSize) {
            topN[k].push(topCombinations[i][leftKey])
            topN[k].push(topCombinations[j][rightKey])
    
          } else {
            topN[k].push(topCombinations[i][leftKey])
            i++
          }
        }  

        // Caso-2
        if ( (leftKey !== rightKey)) {
          if (j !== arrSize) {
            topN[k].push(topCombinations[i][leftKey])
            i++
            k += 1

          } else {
            topN[k].push(topCombinations[i][leftKey])
            k++
            topN[k].push(topCombinations[j][rightKey]) 
            
          }
        } 
      };
    };
      return { topN }
}

/*
  Logic to map the return of Store Top Combinations Method
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
          let maped = { [key]: Number(key), [value]: Number(value) }
          topN[i].push(maped)
        })
    }
    return topN
}

/*
  Logic to remove duplicate key
*/
export const getUniqueValues = async ( arr ) => {
  // qty armazenar quantidade de vezes combinadas
  const qty = []

  // iterar para armazenar quantidade de vezes combinadas
  for ( let j = 0; j < arr.length; j++) {
    let keys = Object.keys(arr[j])[0]
    qty.push(keys)
  }

  // agrupar quantidades de vezes combinadas
  let index = 0
  for ( let i = 1; i < qty.length;  i++ ) {
    if ( qty[index] !== qty[i]) 
    index++
      qty[index] = qty[i]
    }
  
  // remover valores duplicados
  const maxPositions = index+1    
  qty.splice(maxPositions)

  // armazenar valores de vezes combinadas em chaves
  const topValues = {}
  let topValueKey = 1
  for ( let value of qty ) {
     topValues[`top${topValueKey}`] = value
     topValueKey++
  } 

  // retornar o número de pódios
  // retornar o top values
  return {
    topValues,
    maxPositions
  }
}

/*
      i
  3,2,1,2,2,2,1
              j
 */
