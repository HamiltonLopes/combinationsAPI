import { topCombinationsStub } from "../../../../testes/fixtures/db-fixtures.js"
import { InvalidParamError } from "../../../presentation/err/errors.js"


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
    let leftValue, rightValue;
    let leftOutKey, rightOutKey;
    let leftInKey, rightInKey;
  
    if (!Array.isArray(topCombinations) || topCombinations.length === 0 ) {
      throw new InvalidParamError('array topCombinations')
    }
    // Caso 1
    if (topCombinations.length <= 1 && topCombinations[i] !== undefined) {
       leftOutKey = Object.keys(topCombinations[i])[i]
       leftInKey = Object.keys(topCombinations[i][leftOutKey])[i]
      topN[k].push({[leftOutKey]: leftInKey})

    } else { // Caso 2
      for ( ; j < topCombinations.length  ; j++) {
        
        leftOutKey = Object.keys(topCombinations[i])[0]
        rightOutKey = Object.keys(topCombinations[j])[0]
        
        leftValue = Object.values(topCombinations[i][leftOutKey])[0]
        rightValue = Object.values(topCombinations[j][rightOutKey])[0]
        
        leftInKey = Object.keys(topCombinations[i][leftOutKey])[0]
        rightInKey = Object.keys(topCombinations[j][rightOutKey])[0]


        // Caso-2.1
        if ( leftValue === rightValue ) { 
          if (j === arrSize) {
            topN[k].push({[leftOutKey]: leftInKey})
            topN[k].push({[rightOutKey]: rightInKey})
    
          } else {
            topN[k].push({[leftOutKey]: leftInKey})
            i++
          }
        }  

        // Caso-2.2
        if ( (leftValue !== rightValue)) {
          if (j !== arrSize) {
            topN[k].push({[leftOutKey]: leftInKey})
            i++
            k += 1

          } else {
            topN[k].push({[leftOutKey]: leftInKey})
            k++
            topN[k].push({[rightOutKey]: rightInKey})            
          }
        } 
      };
    };
      return { topN }
}





/*
      i
  3,2,1,2,2,2,1
              j
 */
