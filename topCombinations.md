### Lógica para retornar as top combinações da loja 

**topN object factory** 
const N ;
const { topN } = maketopN(N) 

**arrSize = corresponde ao número do tamanho do array inputado**
const arrSize = topCombinations.length -1

**k = corresponde a key do topN**
let k = 1

**i = corresponde ao ponteiro esquerdo no topCombinations**
**j = corresponde ao ponteiro direito no topCombinations**
let i = 0, j = 1;

**verifica se é um array e se ele está vazio**
if (!Array.isArray(topCombinations) || topCombinations.length === 0 ) {
  throw new InvalidParamError('array topCombinations')
}

**capturar as keys dos objetos no lado esquerdo**
leftKey = Object.keys(topCombinations[i])[0]

**verificar e adicionar o value no topN caso só tenho um elemento no array inputado**
if (topCombinations.length < 2 && topCombinations[i] !== undefined) { 
  topN[k].push(topCombinations[i][leftKey])
}

for (; j < topCombinations.length  ; j++) { 

  **capturar as keys dos objetos no lado direito**
  let rightKey = Object.keys(topCombinations[j])[0]

  ##### **Caso-1**
    - Checar se leftKey e rightKey são iguais**
  if ( leftKey === rightKey ) { 
    - se sim, checar se o objeto é o ultimo elemento do topCombinations
    if (j === arrSize) {
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

  ##### **Caso-2**
  - Checar se leftKey e rightKey são diferentes
  if ( (leftKey !== rightKey)) {
    
    - se sim, checar se o objeto não é o último elemento do topCombinations
    if (j !== arrSize) {
      - se sim adicionar o value da esquerda
      topN[k].push(topCombinations[i][leftKey])
      - incrementar ponteiro esquerdo
      i++
      // incrementar a key de topN
      k += 1

    } else {
      - caso em que o objeto é o último elemento do topCombinations
      - adicionar o value da esqueda  
      topN[k].push(topCombinations[i][leftKey])
      - incrementar a key de topN
      k +=1
      - adicionar o value da direita
      topN[k].push(topCombinations[j][rightKey])
      
    }

  } 

}

- Retorno do objeto topN
return { topN }

//change