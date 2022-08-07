/*
  Logic to remove duplicate key
*/
export const getUniqueValues = async ( arr ) => {
  // qty armazenar quantidade de vezes combinadas
  const qty = []

  // iterar para armazenar quantidade de vezes combinadas
  for ( let j = 0; j < arr.length; j++) {
    let keys = Object.keys(arr[j])[0]
    let values = Object.values(arr[j][keys])[0]
    qty.push(values)
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