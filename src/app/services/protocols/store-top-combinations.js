import { topCombinationsStub } from "../../../../fixtures/db-fixtures.js"
import { InvalidParamError } from "../../err/errors.js"

export const maketopN = (n) => {
  const topN= {}
  for (let i = 1 ; i <= n; i++) {
    topN[i] = (topN[i] || [] ) 
  }
  return { topN }
}

export function storeTopCombinations (topNumber, topCombinations ) {

  const N = topNumber
  const { topN } = maketopN(N) 

  let k = 1, i = 0, j = 1;
  const arrSize = topCombinations.length -1
  let rightKey
  let leftKey 

  if (!Array.isArray(topCombinations) || topCombinations.length === 0 ) {
    throw new InvalidParamError('array topCombinations')
  }

  leftKey = Object.keys(topCombinations[i])[0]
  
  if (topCombinations.length < 2 && topCombinations[i] !== undefined) { 
    topN[k].push(topCombinations[i][leftKey])
  }
  
  for ( ; j < topCombinations.length  ; j++) { 
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
        k +=1
        topN[k].push(topCombinations[j][rightKey])
        
      }

    } 

  }

    return { topN } 

}

export function mapStoreTopCombinations (objTopN) {
  const keys = Object.keys(objTopN)
  for (let i = 0; i <= keys.length; i++ ) {

    if(objTopN[i] !== undefined)
      objTopN[i].map((obj) => { const [key, value] = Object.entries(obj) })
  }
  console.log(JSON.stringify(objTopN))
  return objTopN
}



/*
  i
  3,3,3,2,2,2,1
    j

 */
