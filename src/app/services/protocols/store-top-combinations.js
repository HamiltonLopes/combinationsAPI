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

//storeTopCombinations(2, [])















/*
- topN object factory
const N ;
const { topN } = maketopN(N) 


-k = corresponde a key do topN 
let k = 1

- i = corresponde ao ponteiro esquerdo no topCombinations 
- j = corresponde ao ponteiro direito no topCombinations
let i = 0, j = 1;

for (; j < topCombinations.length  ; j++) { 

  - capturar as keys dos objetos no lado esquerdo e direito 
  let leftKey = Object.keys(topCombinations[i])[0]
  let rightKey = Object.keys(topCombinations[j])[0]

  // ***Caso-1***
  - Checar se leftKey e rightKey são iguais 
  if ( leftKey === rightKey ) { 
    - se sim, checar se o objeto é o ultimo elemento do topCombinations
    if (j === topCombinations.length -1) {
      - se sim, adicionar os values das keys dentro do array da key correspondente em topN
      topN[k].push(topCombinations[i][leftKey])
      topN[k].push(topCombinations[j][rightKey])

    } else {
      -  se não, adicionar e somente o value da esquerda
      topN[k].push(topCombinations[i][leftKey])
      - incrementar o ponteiro esquerdo
      i++
    }
  }

  // ***Caso-2***
  - Checar se leftKey e rightKey são diferentes
  if ( (leftKey !== rightKey)) {
    
    # se sim, checar se o objeto não é o último elemento do topCombinations
    if (j !== topCombinations.length -1) {
      - se sim adicionar o value da esquerda
      topN[k].push(topCombinations[i][leftKey])
      - incrementar ponteiro esquerdo
      i++
      // incrementar a key de topN
      k += 1

    } else {
      # caso em que o objeto é o último elemento do topCombinations
      - adicionar o value da esqueda  
      topN[k].push(topCombinations[i][leftKey])
      - incrementar a key de topN
      k +=1
      - adicionar o value da direita
      topN[k].push(topCombinations[j][rightKey])
      
    }

  } 

}

Example about points

  i
  3,3,3,2,2,2,1
    j

 */
